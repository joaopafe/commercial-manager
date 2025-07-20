import { Customer } from "../../domain/entities/Customer";

import { AddCustomerParams } from "../../domain/useCases/CreateCustomer";

import { CustomerRepository } from "../../domain/repositories/CustomerRepository";

export interface CustomerDataSource {
  list(): Promise<Customer[] | null>;
  add(customer: AddCustomerParams): Promise<Customer | Error>;
  edit(customer: Customer): Promise<Customer | Error>;
}

export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(private dataSource: CustomerDataSource) {}

  async list(): Promise<Customer[] | null> {
    const customers = await this.dataSource.list();

    return customers;
  }

  async create(customer: AddCustomerParams): Promise<Customer | Error> {
    const createdCustomer = await this.dataSource.add(customer);

    return createdCustomer;
  }

  async edit(customer: Customer): Promise<Customer | Error> {
    const editedCustomer = await this.dataSource.edit(customer);

    return editedCustomer;
  }
}
