import { QueryResult } from "pg";

import { pool } from "../../../configDB";

import { DomainError } from "../../domain/entities/errors/DomainError";
import { SupplierError } from "../../domain/entities/errors/SupplierError";

import { SupplierData } from "../repositories/SupplierRepositoryImpl";
import { SupplierDataSource } from "../repositories/SupplierRepositoryImpl";

export class SupplierDataSourceImpl implements SupplierDataSource {
  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS suppliers
      (
        id SERIAL PRIMARY KEY,
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

  private mapRowToSupplier(row: any): SupplierData {
    return {
      id: row.id,
      cnpj: row.cnpj,
      name: row.name,
      phone: row.phone,
    };
  }

  async findAll(): Promise<SupplierData[]> {
    const query = `
      SELECT * FROM suppliers;
    `;

    try {
      const suppliers: QueryResult<any> = await pool.query(query);
      return suppliers.rows.map(this.mapRowToSupplier);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to get the suppliers: ${error}`
      );
    }
  }

  async findById(id: number): Promise<SupplierData> {
    const query = `
      SELECT * FROM suppliers
      WHERE id = $1;
    `;

    try {
      const supplier: QueryResult<any> = await pool.query(query, [id]);

      if (supplier.rows.length === 0)
        throw new SupplierError(
          "supplier_not_found",
          "The supplier does not exist"
        );

      return this.mapRowToSupplier(supplier.rows[0]);
    } catch (error) {
      if (error instanceof SupplierError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to get the supplier: ${error}`
      );
    }
  }

  async create(supplier: Omit<SupplierData, "id">): Promise<SupplierData> {
    const query = `
      INSERT INTO suppliers (cnpj, name, phone)
      VALUES ($1, $2, $3)
      RETURNING id, cnpj, name, phone;
    `;

    try {
      const createdSupplier: QueryResult<any> = await pool.query(query, [
        supplier.cnpj,
        supplier.name,
        supplier.phone,
      ]);

      return this.mapRowToSupplier(createdSupplier.rows[0]);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the supplier: ${error}`
      );
    }
  }

  async update(supplier: SupplierData): Promise<SupplierData> {
    const query = `
      UPDATE suppliers
      SET cnpj = COALESCE($1, cnpj),
          name = COALESCE($2, name),
          phone = COALESCE($3, phone)
      WHERE id = $4
      RETURNING id, cnpj, name, phone;
    `;

    try {
      const updatedSupplier: QueryResult<any> = await pool.query(query, [
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

      return this.mapRowToSupplier(updatedSupplier.rows[0]);
    } catch (error) {
      if (error instanceof SupplierError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the supplier: ${error}`
      );
    }
  }

  async remove(id: number): Promise<SupplierData> {
    const query = `
      DELETE FROM suppliers
      WHERE id = $1
      RETURNING id, cnpj, name, phone;
    `;

    try {
      const removedSupplier: QueryResult<any> = await pool.query(query, [id]);

      if (removedSupplier.rows.length === 0)
        throw new SupplierError(
          "supplier_not_found",
          "The supplier does not exist"
        );

      return this.mapRowToSupplier(removedSupplier.rows[0]);
    } catch (error) {
      if (error instanceof SupplierError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to remove the supplier: ${error}`
      );
    }
  }
}
