import { QueryResult } from "pg";

import { pool } from "../../../configDB";

import { DomainError } from "../../domain/entities/errors/DomainError";
import { ItemError } from "../../domain/entities/errors/ItemError";

import { ItemData, ItemDataSource } from "../repositories/ItemRepositoryImpl";

export class ItemDataSourceImpl implements ItemDataSource {
  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS items
      (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          category_id INT NOT NULL,
          price FLOAT NOT NULL,
          supplier_id INT NOT NULL,
          stock_quantity INT NOT NULL
      );
    `;

    try {
      await pool.query(query);
      return true;
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the item table: ${error}`
      );
    }
  }

  private mapRow(row: any): ItemData {
    return {
      id: row.id,
      name: row.name,
      categoryId: row.category_id,
      price: row.price,
      supplierId: row.supplier_id,
      stockQuantity: row.stock_quantity,
    };
  }

  async findAll(): Promise<ItemData[]> {
    const query = `
      SELECT * FROM items;
    `;

    try {
      const items: QueryResult<any> = await pool.query(query);
      return items.rows.map(this.mapRow);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to get the items: ${error}`
      );
    }
  }

  async findById(id: number): Promise<ItemData> {
    const query = `
      SELECT * FROM items WHERE id = $1;
    `;

    try {
      const item: QueryResult<any> = await pool.query(query, [id]);

      if (item.rows.length === 0)
        throw new ItemError("item_not_found", "The item does not exist");

      return this.mapRow(item.rows[0]);
    } catch (error) {
      if (error instanceof ItemError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to get the item: ${error}`
      );
    }
  }

  async create(
    item: Omit<ItemData, "id" | "stockQuantity">
  ): Promise<ItemData> {
    const query = `
      INSERT INTO items (name, category_id, price, supplier_id, stock_quantity)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, category_id, price, supplier_id, stock_quantity;
    `;

    try {
      const createdItem: QueryResult<any> = await pool.query(query, [
        item.name,
        item.categoryId,
        item.price,
        item.supplierId,
        0, // Initial value for stock
      ]);

      return this.mapRow(createdItem.rows[0]);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the item: ${error}`
      );
    }
  }

  async update(item: Omit<ItemData, "stockQuantity">): Promise<ItemData> {
    const query = `
      UPDATE items
      SET name = COALESCE($1, name),
          category_id = COALESCE($2, category_id),
          price = COALESCE($3, price),
          supplier_id = COALESCE($4, supplier_id)
      WHERE id = $5
      RETURNING id, name, category_id, price, supplier_id, stock_quantity;
    `;

    try {
      const updatedItem: QueryResult<any> = await pool.query(query, [
        item.name,
        item.categoryId,
        item.price,
        item.supplierId,
        item.id,
      ]);

      if (updatedItem.rows.length === 0)
        throw new ItemError("item_not_found", "The item does not exist");

      return this.mapRow(updatedItem.rows[0]);
    } catch (error) {
      if (error instanceof ItemError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the item: ${error}`
      );
    }
  }

  async remove(id: number): Promise<ItemData> {
    const query = `
      DELETE FROM items
      WHERE id = $1
      RETURNING id, name, category_id, price, supplier_id, stock_quantity;
    `;

    try {
      const removedItem: QueryResult<any> = await pool.query(query, [id]);

      if (removedItem.rows.length === 0)
        throw new ItemError("item_not_found", "The item does not exist");

      return this.mapRow(removedItem.rows[0]);
    } catch (error) {
      if (error instanceof ItemError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to remove the item: ${error}`
      );
    }
  }

  async updateStock(id: number, stockQuantity: number): Promise<ItemData> {
    const query = `
      UPDATE items
      SET stock_quantity = COALESCE($1, stock_quantity)
      WHERE id = $2
      RETURNING id, name, category_id, price, supplier_id, stock_quantity;
    `;

    try {
      const updatedItem: QueryResult<any> = await pool.query(query, [
        stockQuantity,
        id,
      ]);

      if (updatedItem.rows.length === 0)
        throw new ItemError("item_not_found", "The item does not exist");

      return this.mapRow(updatedItem.rows[0]);
    } catch (error) {
      if (error instanceof ItemError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the stock of the item: ${error}`
      );
    }
  }
}
