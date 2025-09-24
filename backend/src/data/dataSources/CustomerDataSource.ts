import { QueryResult } from "pg";

import { pool } from "../../../configDB";

import { DomainError } from "../../domain/entities/errors/DomainError";
import { CustomerError } from "../../domain/entities/errors/CustomerError";

export interface Customer {
  id: number;
  cpf: string;
  name: string;
  email: string;
  phone: string;
}

export class CustomerDataSource {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS customers
      (
        id SERIAL PRIMARY KEY,
        cpf TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL
      );
    `;

    try {
      await pool.query(query);
      return true;
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the customer table: ${error}`
      );
    }
  }

  private static mapRow(row: any): Customer {
    return {
      id: row.id,
      cpf: row.cpf,
      name: row.name,
      email: row.email,
      phone: row.phone,
    };
  }

  static async findAll(): Promise<Customer[]> {
    const query = `
      SELECT * FROM customers;
    `;

    try {
      const customers: QueryResult<any> = await pool.query(query);
      return customers.rows.map(this.mapRow);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to get the customers: ${error}`
      );
    }
  }

  static async findById(id: number): Promise<Customer> {
    const query = `
      SELECT * FROM customers WHERE id = $1;
    `;

    try {
      const customer: QueryResult<any> = await pool.query(query, [id]);

      if (customer.rows.length === 0)
        throw new CustomerError(
          "customer_not_found",
          "The customer does not exist"
        );

      return this.mapRow(customer.rows[0]);
    } catch (error) {
      if (error instanceof CustomerError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to get the customer: ${error}`
      );
    }
  }

  static async create(customer: Omit<Customer, "id">): Promise<Customer> {
    const query = `
      INSERT INTO customers (cpf, name, email, phone)
      VALUES ($1, $2, $3, $4)
      RETURNING id, cpf, name, email, phone;
    `;

    try {
      const createdCustomer: QueryResult<any> = await pool.query(query, [
        customer.cpf,
        customer.name,
        customer.email,
        customer.phone,
      ]);

      return this.mapRow(createdCustomer.rows[0]);
    } catch (error) {
      throw new DomainError(
        "unknown",
        `It was not possible to create the customer: ${error}`
      );
    }
  }

  static async update(customer: Customer): Promise<Customer> {
    const query = `
      UPDATE customers
      SET cpf = COALESCE($1, cpf),
          name = COALESCE($2, name),
          email = COALESCE($3, email),
          phone = COALESCE($4, phone)
      WHERE id = $5
      RETURNING id, cpf, name, email, phone;
    `;

    try {
      const updatedCustomer: QueryResult<any> = await pool.query(query, [
        customer.cpf,
        customer.name,
        customer.email,
        customer.phone,
        customer.id,
      ]);

      if (updatedCustomer.rows.length === 0)
        throw new CustomerError(
          "customer_not_found",
          "The customer does not exist"
        );

      return this.mapRow(updatedCustomer.rows[0]);
    } catch (error) {
      if (error instanceof CustomerError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to update the customer: ${error}`
      );
    }
  }

  static async remove(id: number): Promise<Customer> {
    const query = `
      DELETE FROM customers
      WHERE id = $1
      RETURNING id, cpf, name, email, phone;
    `;

    try {
      const removedCustomer: QueryResult<any> = await pool.query(query, [id]);

      if (removedCustomer.rows.length === 0)
        throw new CustomerError(
          "customer_not_found",
          "The customer does not exist"
        );

      return this.mapRow(removedCustomer.rows[0]);
    } catch (error) {
      if (error instanceof CustomerError) throw error;

      throw new DomainError(
        "unknown",
        `It was not possible to remove the customer: ${error}`
      );
    }
  }
}
