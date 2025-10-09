import { QueryResult } from "pg";
import { pool } from "../../../configDB";
import { DomainError } from "../../domain/entities/errors/DomainError";
import { ProductPurchaseError } from "../../domain/entities/errors/ProductPurchaseError";

import {
  ProductPurchaseData,
  ProductPurchaseDataSource,
} from "../repositories/ProductPurchaseRepositoryImpl";

export class ProductPurchaseDataSourceImpl
  implements ProductPurchaseDataSource
{
  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS product_purchases
      (
        id SERIAL PRIMARY KEY,
        supplier_id INT NOT NULL,
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
        `It was not possible to create the product_purchases table: ${error}`
      );
    }
  }

  private mapRowToProductPurchase(row: any): ProductPurchaseData {
    return {
      id: row.id,
      supplierId: row.supplier_id,
      itemId: row.item_id,
      quantity: row.quantity,
      value: row.value,
      date: row.date,
    };
  }

  async findAll(): Promise<ProductPurchaseData[]> {
    const query = `
      SELECT * FROM product_purchases;
    `;

    try {
      const result: QueryResult<any> = await pool.query(query);
      return result.rows.map(this.mapRowToProductPurchase);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to get the product purchases: ${error}`
      );
    }
  }

  async findById(id: number): Promise<ProductPurchaseData> {
    const query = `
      SELECT * FROM product_purchases
      WHERE id = $1;
    `;

    try {
      const result: QueryResult<any> = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        throw new ProductPurchaseError(
          "product_purchase_not_found",
          "The product purchase does not exist"
        );
      }

      return this.mapRowToProductPurchase(result.rows[0]);
    } catch (error) {
      if (error instanceof ProductPurchaseError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to get the product purchase: ${error}`
      );
    }
  }

  async create(
    productPurchase: Omit<ProductPurchaseData, "id">
  ): Promise<ProductPurchaseData> {
    const query = `
      INSERT INTO product_purchases (supplier_id, item_id, quantity, value, date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    try {
      const result: QueryResult<any> = await pool.query(query, [
        productPurchase.supplierId,
        productPurchase.itemId,
        productPurchase.quantity,
        productPurchase.value,
        productPurchase.date,
      ]);

      return this.mapRowToProductPurchase(result.rows[0]);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the product purchase: ${error}`
      );
    }
  }

  async update(
    productPurchase: ProductPurchaseData
  ): Promise<ProductPurchaseData> {
    const query = `
      UPDATE product_purchases
      SET 
        supplier_id = COALESCE($1, supplier_id),
        item_id = COALESCE($2, item_id),
        quantity = COALESCE($3, quantity),
        value = COALESCE($4, value),
        date = COALESCE($5, date)
      WHERE id = $6
      RETURNING *;
    `;

    try {
      const result: QueryResult<any> = await pool.query(query, [
        productPurchase.supplierId,
        productPurchase.itemId,
        productPurchase.quantity,
        productPurchase.value,
        productPurchase.date,
        productPurchase.id,
      ]);

      if (result.rows.length === 0) {
        throw new ProductPurchaseError(
          "product_purchase_not_found",
          "The product purchase does not exist"
        );
      }

      return this.mapRowToProductPurchase(result.rows[0]);
    } catch (error) {
      if (error instanceof ProductPurchaseError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the product purchase: ${error}`
      );
    }
  }

  async remove(id: number): Promise<ProductPurchaseData> {
    const query = `
      DELETE FROM product_purchases
      WHERE id = $1
      RETURNING *;
    `;

    try {
      const result: QueryResult<any> = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        throw new ProductPurchaseError(
          "product_purchase_not_found",
          "The product purchase does not exist"
        );
      }

      return this.mapRowToProductPurchase(result.rows[0]);
    } catch (error) {
      if (error instanceof ProductPurchaseError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to remove the product purchase: ${error}`
      );
    }
  }
}
