import { QueryResult } from "pg";

import { pool } from "../../../configDB";

import { DomainError } from "../../domain/entities/errors/DomainError";
import { CategoryError } from "../../domain/entities/errors/CategoryError";

export interface ItemCategory {
  id: number;
  name: string;
}

export class ItemCategoryDataSource {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS item_categories
      (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );
    `;

    try {
      await pool.query(query);
      return true;
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the item categories table: ${error}`
      );
    }
  }

  private static mapRow(row: any): ItemCategory {
    return {
      id: row.id,
      name: row.name,
    };
  }

  static async findAll(): Promise<ItemCategory[]> {
    const query = `
      SELECT * FROM item_categories;
    `;

    try {
      const itemCategories: QueryResult<any> = await pool.query(query);
      return itemCategories.rows.map(this.mapRow);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to get the item categories: ${error}`
      );
    }
  }

  static async findById(id: number): Promise<ItemCategory> {
    const query = `
      SELECT * FROM item_categories WHERE id = $1;
    `;

    try {
      const itemCategory: QueryResult<any> = await pool.query(query, [id]);

      if (itemCategory.rows.length === 0)
        throw new CategoryError(
          "category_not_found",
          "The category does not exist"
        );

      return this.mapRow(itemCategory.rows[0]);
    } catch (error) {
      if (error instanceof CategoryError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to get the item category: ${error}`
      );
    }
  }

  static async create(name: string): Promise<ItemCategory> {
    const query = `
      INSERT INTO item_categories (name)
      VALUES ($1)
      RETURNING id, name;
    `;

    try {
      const createdItemCategory: QueryResult<any> = await pool.query(query, [
        name,
      ]);

      return this.mapRow(createdItemCategory.rows[0]);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the item category: ${error}`
      );
    }
  }

  static async update(itemCategory: ItemCategory): Promise<ItemCategory> {
    const query = `
      UPDATE item_categories
      SET name = COALESCE($1, name)
      WHERE id = $2
      RETURNING id, name;
    `;

    try {
      const updatedItemCategory: QueryResult<any> = await pool.query(query, [
        itemCategory.name,
        itemCategory.id,
      ]);

      if (updatedItemCategory.rows.length === 0)
        throw new CategoryError(
          "category_not_found",
          "The item category does not exist"
        );

      return this.mapRow(updatedItemCategory.rows[0]);
    } catch (error) {
      if (error instanceof CategoryError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the item category: ${error}`
      );
    }
  }

  static async remove(id: number): Promise<ItemCategory> {
    const query = `
      DELETE FROM item_categories
      WHERE id = $1
      RETURNING id, name;
    `;

    try {
      const removedItemCategory: QueryResult<any> = await pool.query(query, [
        id,
      ]);

      if (removedItemCategory.rows.length === 0)
        throw new CategoryError(
          "category_not_found",
          "The item category does not exist"
        );

      return this.mapRow(removedItemCategory.rows[0]);
    } catch (error) {
      if (error instanceof CategoryError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to remove the item category: ${error}`
      );
    }
  }
}
