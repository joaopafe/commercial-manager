import { QueryResult } from "pg";

import { pool } from "../../../configDB";

import { DomainError } from "../../domain/entities/errors/DomainError";
import { ServiceSaleError } from "../../domain/entities/errors/ServiceSaleError";

import { ServiceSaleData } from "../repositories/ServiceSaleRepositoryImpl";
import { ServiceSaleDataSource } from "../repositories/ServiceSaleRepositoryImpl";

export class ServiceSaleDataSourceImpl implements ServiceSaleDataSource {
  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS service_sales
      (
          id SERIAL PRIMARY KEY,
          customer_id INT NOT NULL,
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
        `It was not possible to create the service sale table: ${error}`
      );
    }
  }

  private mapRowToServiceSale(row: any): ServiceSaleData {
    return {
      id: row.id,
      customerId: row.customer_id,
      name: row.name,
      value: row.value,
      date: row.date,
    };
  }

  async findAll(): Promise<ServiceSaleData[]> {
    const query = `
      SELECT * FROM service_sales;
    `;

    try {
      const serviceSales: QueryResult<any> = await pool.query(query);
      return serviceSales.rows.map(this.mapRowToServiceSale);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to get the service sales: ${error}`
      );
    }
  }

  async findById(id: number): Promise<ServiceSaleData> {
    const query = `
      SELECT * FROM service_sales
      WHERE id = $1
    `;

    try {
      const serviceSale: QueryResult<any> = await pool.query(query, [id]);

      if (serviceSale.rows.length === 0)
        throw new ServiceSaleError(
          "service_sale_not_found",
          "The service sale does not exist"
        );

      return this.mapRowToServiceSale(serviceSale.rows[0]);
    } catch (error) {
      if (error instanceof ServiceSaleError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to get the service sale: ${error}`
      );
    }
  }

  async create(
    serviceSale: Omit<ServiceSaleData, "id">
  ): Promise<ServiceSaleData> {
    const query = `
      INSERT INTO service_sales (customer_id, name, value, date)
      VALUES ($1, $2, $3, $4)
      RETURNING id, customer_id, name, value, date;
    `;

    try {
      const createdServiceSale: QueryResult<any> = await pool.query(query, [
        serviceSale.customerId,
        serviceSale.name,
        serviceSale.value,
        serviceSale.date,
      ]);

      return this.mapRowToServiceSale(createdServiceSale.rows[0]);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the service sale: ${error}`
      );
    }
  }

  async update(serviceSale: ServiceSaleData): Promise<ServiceSaleData> {
    const query = `
      UPDATE service_sales
      SET customer_id = COALESCE($1, customer_id),
          name = COALESCE($2, name),
          value = COALESCE($3, value),
          date = COALESCE($4, date)
      WHERE id = $5
      RETURNING id, customer_id, name, value, date;
    `;

    try {
      const updatedServiceSale: QueryResult<any> = await pool.query(query, [
        serviceSale.customerId,
        serviceSale.name,
        serviceSale.value,
        serviceSale.date,
        serviceSale.id,
      ]);

      if (updatedServiceSale.rows.length === 0)
        throw new ServiceSaleError(
          "service_sale_not_found",
          "The service sale does not exist"
        );

      return this.mapRowToServiceSale(updatedServiceSale.rows[0]);
    } catch (error) {
      if (error instanceof ServiceSaleError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the service sale: ${error}`
      );
    }
  }

  async remove(id: number): Promise<ServiceSaleData> {
    const query = `
      DELETE FROM service_sales
      WHERE id = $1
      RETURNING id, customer_id, name, value, date;
    `;

    try {
      const removedServiceSale: QueryResult<any> = await pool.query(query, [
        id,
      ]);

      if (removedServiceSale.rows.length === 0)
        throw new ServiceSaleError(
          "service_sale_not_found",
          "The service sale does not exist"
        );

      return this.mapRowToServiceSale(removedServiceSale.rows[0]);
    } catch (error) {
      if (error instanceof ServiceSaleError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to remove the service sale: ${error}`
      );
    }
  }
}
