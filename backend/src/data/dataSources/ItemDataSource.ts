import { QueryResult } from "pg";

import { pool } from "../../../configDB";

import { DomainError } from "../../domain/entities/errors/DomainError";
import { ItemError } from "../../domain/entities/errors/ItemError";

export interface Item {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  supplierId: number;
  stockQuantity: number;
}

export class ItemDataSource {
  static async createTable() {
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

  static async findAll(): Promise<Item[]> {
    const query = `
        SELECT * FROM items
    `;

    try {
      const items: QueryResult<Item> = await pool.query(query);

      return items.rows;
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to get the items: ${error}`
      );
    }
  }

  static async findById(id: number): Promise<Item> {
    const query = `
        SELECT * FROM items
        WHERE id = $1;
    `;

    try {
      const item: QueryResult<Item> = await pool.query(query, [id]);

      if (item.rows.length === 0)
        throw new ItemError("item_not_found", "The item does not exist");

      return item.rows[0] as Item;
    } catch (error) {
      if (error instanceof ItemError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to get the item: ${error}`
      );
    }
  }

  static async create(item: Omit<Item, "id" | "stockQuantity">): Promise<Item> {
    const query = `
        INSERT INTO items (name, category_id, price, supplier_id, stock_quantity)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, category, price, supplier_id, stock_quantity;
    `;

    try {
      const createdItem: QueryResult<Item> = await pool.query(query, [
        item.name,
        item.categoryId,
        item.price,
        item.supplierId,
        1,
      ]);

      return createdItem.rows[0] as Item;
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the item: ${error}`
      );
    }
  }

  static async update(item: Omit<Item, "stockQuantity">): Promise<Item> {
    const query = `
        UPDATE items
        set name = COALESCE($1, name),
            category_id = COALESCE($2, category_id),
            price = COALESCE($3, price),
            supplier_id = COALESCE($4, supplier_id)
        WHERE id = $5
        RETURNING id, name, category_id, price, supplier_id, stock_quantity;
    `;

    try {
      const updatedItem: QueryResult<Item> = await pool.query(query, [
        item.name,
        item.categoryId,
        item.price,
        item.supplierId,
        item.id,
      ]);

      if (updatedItem.rows.length === 0)
        throw new ItemError("item_not_found", "The item does not exist");

      return updatedItem.rows[0] as Item;
    } catch (error) {
      if (error instanceof ItemError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the item: ${item}`
      );
    }
  }

  static async remove(id: number): Promise<Item> {
    const query = `
        DELETE FROM items
        WHERE id = $1
        RETURNING id, name, category_id, price, supplier_id, stock_quantity;
    `;

    try {
      const removedItem: QueryResult<Item> = await pool.query(query, [id]);

      if (removedItem.rows.length === 0)
        throw new ItemError("item_not_found", "The item does not exist");

      return removedItem.rows[0] as Item;
    } catch (error) {
      if (error instanceof ItemError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to remove the item: ${error}`
      );
    }
  }

  static async updateStock(id: number, stockQuantity: number): Promise<Item> {
    const query = `
        UPDATE items
        SET stock_quantity = COALESCE($1, stock_quantity),
        WHERE id = $2
        RETURNING id, name, category_id, price, supplier_id, stock_quantity;
    `;

    try {
      const updatedItem: QueryResult<Item> = await pool.query(query, [
        stockQuantity,
        id,
      ]);

      if (updatedItem.rows.length === 0)
        throw new ItemError("item_not_found", "The item does not exist");

      return updatedItem.rows[0] as Item;
    } catch (error) {
      if (error instanceof ItemError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the stock to the item: ${error}`
      );
    }
  }
}
