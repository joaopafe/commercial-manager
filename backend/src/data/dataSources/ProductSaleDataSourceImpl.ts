import { QueryResult } from "pg";

import { pool } from "../../../configDB";

import { DomainError } from "../../domain/entities/errors/DomainError";
import { ProductSaleError } from "../../domain/entities/errors/ProductSaleError";

import { ProductSaleData } from "../repositories/ProductSaleRepositoryImpl";
import { ProductSaleDataSource } from "../repositories/ProductSaleRepositoryImpl";

export class ProductSaleDataSourceImpl implements ProductSaleDataSource {
  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS product_sales
      (
          id SERIAL PRIMARY KEY,
          customer_id INT NOT NULL,
          item_id INT NOT NULL,
          quantity INT NOT NULL,
          value FLOAT NOT NULL,
          date DATE NOT NULL
      );
    `;

    try {
      await pool.query(query);
      return true;
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the product sale table: ${error}`
      );
    }
  }

  private mapRowToProductSale(row: any): ProductSaleData {
    return {
      id: row.id,
      customerId: row.customer_id,
      itemId: row.item_id,
      quantity: row.quantity,
      value: row.value,
      date: row.date,
    };
  }

  async findAll(): Promise<ProductSaleData[]> {
    const query = `
      SELECT * FROM product_sales;
    `;

    try {
      const productSales: QueryResult<any> = await pool.query(query);
      return productSales.rows.map(this.mapRowToProductSale);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to get the product sales: ${error}`
      );
    }
  }

  async findById(id: number): Promise<ProductSaleData> {
    const query = `
      SELECT * FROM product_sales
      WHERE id = $1
    `;

    try {
      const productSale: QueryResult<any> = await pool.query(query, [id]);

      if (productSale.rows.length === 0)
        throw new ProductSaleError(
          "product_sale_not_found",
          "The product sale does not exist"
        );

      return this.mapRowToProductSale(productSale.rows[0]);
    } catch (error) {
      if (error instanceof ProductSaleError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to get the product sale: ${error}`
      );
    }
  }

  async create(
    productSale: Omit<ProductSaleData, "id">
  ): Promise<ProductSaleData> {
    const query = `
      INSERT INTO product_sales (customer_id, item_id, quantity, value, date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, customer_id, item_id, quantity, value, date;
    `;

    try {
      const createdProductSale: QueryResult<any> = await pool.query(query, [
        productSale.customerId,
        productSale.itemId,
        productSale.quantity,
        productSale.value,
        productSale.date,
      ]);

      return this.mapRowToProductSale(createdProductSale.rows[0]);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the product sale: ${error}`
      );
    }
  }

  async update(productSale: ProductSaleData): Promise<ProductSaleData> {
    const query = `
      UPDATE product_sales
      SET customer_id = COALESCE($1, customer_id),
          item_id = COALESCE($2, item_id),
          quantity = COALESCE($3, quantity),
          value = COALESCE($4, value),
          date = COALESCE($5, date)
      WHERE id = $6
      RETURNING id, customer_id, item_id, quantity, value, date;
    `;

    try {
      const updatedProductSale: QueryResult<any> = await pool.query(query, [
        productSale.customerId,
        productSale.itemId,
        productSale.quantity,
        productSale.value,
        productSale.date,
        productSale.id,
      ]);

      if (updatedProductSale.rows.length === 0)
        throw new ProductSaleError(
          "product_sale_not_found",
          "The product sale does not exist"
        );

      return this.mapRowToProductSale(updatedProductSale.rows[0]);
    } catch (error) {
      if (error instanceof ProductSaleError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the product sale: ${error}`
      );
    }
  }

  async remove(id: number): Promise<ProductSaleData> {
    const query = `
      DELETE FROM product_sales
      WHERE id = $1
      RETURNING id, customer_id, item_id, quantity, value, date;
    `;

    try {
      const removedProductSale: QueryResult<any> = await pool.query(query, [
        id,
      ]);

      if (removedProductSale.rows.length === 0)
        throw new ProductSaleError(
          "product_sale_not_found",
          "The product sale does not exist"
        );

      return this.mapRowToProductSale(removedProductSale.rows[0]);
    } catch (error) {
      if (error instanceof ProductSaleError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to remove the product sale: ${error}`
      );
    }
  }
}
