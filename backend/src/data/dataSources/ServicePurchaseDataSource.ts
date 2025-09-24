import { QueryResult } from "pg";

import { pool } from "../../../configDB";

import { DomainError } from "../../domain/entities/errors/DomainError";
import { ServicePurchaseError } from "../../domain/entities/errors/ServicePurchaseError";

export interface ServicePurchase {
  id: number;
  supplierId: number;
  name: string;
  value: number;
  date: Date;
}

export class ServicePurchaseDataSource {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS service_purchases
      (
          id SERIAL PRIMARY KEY,
          supplier_id INT NOT NULL,
          name TEXT NOT NULL,
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
        `It was not possible to create the service purchase table: ${error}`
      );
    }
  }

  private static mapRowToServicePurchase(row: any): ServicePurchase {
    return {
      id: row.id,
      supplierId: row.supplier_id,
      name: row.name,
      value: row.value,
      date: row.date,
    };
  }

  static async findAll(): Promise<ServicePurchase[]> {
    const query = `SELECT * FROM service_purchases;`;

    try {
      const servicePurchases: QueryResult<any> = await pool.query(query);
      return servicePurchases.rows.map(this.mapRowToServicePurchase);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to get the service purchases: ${error}`
      );
    }
  }

  static async findById(id: number): Promise<ServicePurchase> {
    const query = `SELECT * FROM service_purchases WHERE id = $1`;

    try {
      const servicePurchase: QueryResult<any> = await pool.query(query, [id]);

      if (servicePurchase.rows.length === 0)
        throw new ServicePurchaseError(
          "service_purchase_not_found",
          "The service purchase does not exist"
        );

      return this.mapRowToServicePurchase(servicePurchase.rows[0]);
    } catch (error) {
      if (error instanceof ServicePurchaseError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to get the service purchase: ${error}`
      );
    }
  }

  static async create(
    servicePurchase: Omit<ServicePurchase, "id">
  ): Promise<ServicePurchase> {
    const query = `
      INSERT INTO service_purchases (supplier_id, name, value, date)
      VALUES ($1, $2, $3, $4)
      RETURNING id, supplier_id, name, value, date;
    `;

    try {
      const createdServicePurchase: QueryResult<any> = await pool.query(query, [
        servicePurchase.supplierId,
        servicePurchase.name,
        servicePurchase.value,
        servicePurchase.date,
      ]);

      return this.mapRowToServicePurchase(createdServicePurchase.rows[0]);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the service purchase: ${error}`
      );
    }
  }

  static async update(
    servicePurchase: ServicePurchase
  ): Promise<ServicePurchase> {
    const query = `
      UPDATE service_purchases
      SET supplier_id = COALESCE($1, supplier_id),
          name = COALESCE($2, name),
          value = COALESCE($3, value),
          date = COALESCE($4, date)
      WHERE id = $5
      RETURNING id, supplier_id, name, value, date;
    `;

    try {
      const updatedServicePurchase: QueryResult<any> = await pool.query(query, [
        servicePurchase.supplierId,
        servicePurchase.name,
        servicePurchase.value,
        servicePurchase.date,
        servicePurchase.id,
      ]);

      if (updatedServicePurchase.rows.length === 0)
        throw new ServicePurchaseError(
          "service_purchase_not_found",
          "The service purchase does not exist"
        );

      return this.mapRowToServicePurchase(updatedServicePurchase.rows[0]);
    } catch (error) {
      if (error instanceof ServicePurchaseError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the service purchase: ${error}`
      );
    }
  }

  static async remove(id: number): Promise<ServicePurchase> {
    const query = `
      DELETE FROM service_purchases
      WHERE id = $1
      RETURNING id, supplier_id, name, value, date;
    `;

    try {
      const removedServicePurchase: QueryResult<any> = await pool.query(query, [
        id,
      ]);

      if (removedServicePurchase.rows.length === 0)
        throw new ServicePurchaseError(
          "service_purchase_not_found",
          "The service purchase does not exist"
        );

      return this.mapRowToServicePurchase(removedServicePurchase.rows[0]);
    } catch (error) {
      if (error instanceof ServicePurchaseError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to remove the service purchase: ${error}`
      );
    }
  }
}
