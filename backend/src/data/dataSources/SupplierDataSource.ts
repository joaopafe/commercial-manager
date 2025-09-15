import { QueryResult } from "pg";

import { pool } from "../../../configDB";

import { DomainError } from "../../domain/entities/errors/DomainError";
import { SupplierError } from "../../domain/entities/errors/SupplierError";

export interface Supplier {
  id: number;
  cnpj: string;
  name: string;
  phone: string;
}

export class SupplierDataSource {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS suppliers
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cnpj TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL
      );
    `;

    try {
      await pool.query(query);

      return true;
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the suppliers table: ${error}`
      );
    }
  }

  static async findAll(): Promise<Supplier[]> {
    const query = `
      SELECT * FROM suppliers;
    `;

    try {
      const suppliers: QueryResult<Supplier> = await pool.query(query);

      return suppliers.rows;
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to get the suppliers: ${error}`
      );
    }
  }

  static async findById(id: number): Promise<Supplier> {
    const query = `
      SELECT * FROM suppliers
      WHERE id = $1;
    `;

    try {
      const supplier: QueryResult<Supplier> = await pool.query(query, [id]);

      if (supplier.rows.length === 0)
        throw new SupplierError(
          "supplier_not_found",
          "The supplier does not exist"
        );

      return supplier.rows[0] as Supplier;
    } catch (error) {
      if (error instanceof SupplierError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to get the supplier: ${error}`
      );
    }
  }

  static async create(supplier: Omit<Supplier, "id">): Promise<Supplier> {
    const query = `
      INSERT INTO suppliers (cnpj, name, phone)
      VALUES ($1, $2, $3)
      RETURNING id, cnpj, name, phone;
    `;

    try {
      const createdSupplier: QueryResult<Supplier> = await pool.query(query, [
        supplier.cnpj,
        supplier.name,
        supplier.phone,
      ]);

      return createdSupplier.rows[0] as Supplier;
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the supplier: ${supplier}`
      );
    }
  }

  static async update(supplier: Supplier): Promise<Supplier> {
    const query = `
      UPDATE suppliers
      SET cnpj = COALESCE($1, cnpj),
          name = COALESCE($2, name),
          phone = COALESCE($3, phone)
      WHERE id = $4
      RETURNING id, cnpj, name, phone;
    `;

    try {
      const updatedSupplier: QueryResult<Supplier> = await pool.query(query, [
        supplier.cnpj,
        supplier.name,
        supplier.phone,
        supplier.id,
      ]);

      if (updatedSupplier.rows.length === 0)
        throw new SupplierError(
          "supplier_not_found",
          "The supplier does not exist"
        );

      return updatedSupplier.rows[0] as Supplier;
    } catch (error) {
      if (error instanceof SupplierError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the supplier: ${error}`
      );
    }
  }

  static async remove(id: number): Promise<Supplier> {
    const query = `
      DELETE FROM suppliers
      WHERE id = $1
      RETURNING id, cnpj, name, phone;
    `;

    try {
      const removedSupplier: QueryResult<Supplier> = await pool.query(query, [
        id,
      ]);

      if (removedSupplier.rows.length === 0)
        throw new SupplierError(
          "supplier_not_found",
          "The supplier does not exist"
        );

      return removedSupplier.rows[0] as Supplier;
    } catch (error) {
      if (error instanceof SupplierError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to remove the supplier: ${error}`
      );
    }
  }
}
