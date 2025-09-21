import { QueryResult } from "pg";

import { pool } from "../../../configDB";

import { DomainError } from "../../domain/entities/errors/DomainError";
import { ServiceSaleError } from "../../domain/entities/errors/ServiceSaleError";

export interface ServiceSale {
  id: number;
  customerId: number;
  name: string;
  value: number;
  date: Date;
}

export class ServiceSaleDataSource {
  static async createTable() {
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

  static async findAll(): Promise<ServiceSale[]> {
    const query = `
        SELECT * FROM service_sales;
    `;

    try {
      const serviceSales: QueryResult<ServiceSale> = await pool.query(query);

      return serviceSales.rows;
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to get the service sales: ${error}`
      );
    }
  }

  static async findById(id: number): Promise<ServiceSale> {
    const query = `
        SELECT * FROM service_sales
        WHERE id = $1
    `;

    try {
      const serviceSale: QueryResult<ServiceSale> = await pool.query(query, [
        id,
      ]);

      if (serviceSale.rows.length === 0)
        throw new ServiceSaleError(
          "service_sale_not_found",
          "The service sale does not exist"
        );

      return serviceSale.rows[0] as ServiceSale;
    } catch (error) {
      if (error instanceof ServiceSaleError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to get the service sale: ${error}`
      );
    }
  }

  static async create(
    servicesale: Omit<ServiceSale, "id">
  ): Promise<ServiceSale> {
    const query = `
        INSERT INTO service_sales (customer_id, name, value, date)
        VALUES ($1, $2, $3, $4)
        RETURNING id, customer_id, name, value, date;
    `;

    try {
      const createdServiceSale: QueryResult<ServiceSale> = await pool.query(
        query,
        [
          servicesale.customerId,
          servicesale.name,
          servicesale.value,
          servicesale.date,
        ]
      );

      return createdServiceSale.rows[0] as ServiceSale;
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the service sale: ${error}`
      );
    }
  }

  static async update(servicesale: ServiceSale): Promise<ServiceSale> {
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
      const updatedServiceSale: QueryResult<ServiceSale> = await pool.query(
        query,
        [
          servicesale.customerId,
          servicesale.name,
          servicesale.value,
          servicesale.date,
          servicesale.id,
        ]
      );

      if (updatedServiceSale.rows.length === 0)
        throw new ServiceSaleError(
          "service_sale_not_found",
          "The service sale does not exist"
        );

      return updatedServiceSale.rows[0] as ServiceSale;
    } catch (error) {
      if (error instanceof ServiceSaleError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the service sale: ${error}`
      );
    }
  }

  static async remove(id: number): Promise<ServiceSale> {
    const query = `
          DELETE FROM service_sales
          WHERE id = $1
          RETURNING id, customer_id, name, value, date;
      `;

    try {
      const removedServiceSale: QueryResult<ServiceSale> = await pool.query(
        query,
        [id]
      );

      if (removedServiceSale.rows.length === 0)
        throw new ServiceSaleError(
          "service_sale_not_found",
          "The service sale does not exist"
        );

      return removedServiceSale.rows[0] as ServiceSale;
    } catch (error) {
      if (error instanceof ServiceSaleError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to remove the service sale: ${error}`
      );
    }
  }
}
