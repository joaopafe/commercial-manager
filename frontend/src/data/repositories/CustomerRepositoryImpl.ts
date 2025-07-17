import { Customer } from "../../domain/entities/Customer";

import { CustomerRepository } from "../../domain/repositories/CustomerRepository";

export interface CustomerDataSource {
  list(): Promise<Customer[] | null>;
}

export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(private dataSource: CustomerDataSource) {}

  async list(): Promise<Customer[] | null> {
    const customers = await this.dataSource.list();

    return customers;
  }
}
