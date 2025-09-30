import {
  CPF,
  Name,
  Email,
  Phone,
  Customer,
} from "../../domain/entities/Customer";
import { Id } from "../../domain/entities/shared/Id";

import {
  CustomerRepository,
  ParamsForCustomerCreation,
} from "../../domain/repositories/CustomerRepository";

export interface CustomerData {
  id: number;
  cpf: string;
  name: string;
  email: string;
  phone: string;
}

export interface CustomerDataSource {
  createTable(): Promise<boolean>;
  findAll(): Promise<CustomerData[]>;
  findById(id: number): Promise<CustomerData>;
  create(customer: Omit<CustomerData, "id">): Promise<CustomerData>;
  update(customer: CustomerData): Promise<CustomerData>;
  remove(id: number): Promise<CustomerData>;
}

export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(private customerDataSource: CustomerDataSource) {}

  async getAllCustomers(): Promise<Customer[] | null> {
    const customers = await this.customerDataSource.findAll();

    const mappedCustomers = customers.map((customer) => {
      const id = new Id(customer.id);
      const cpf = new CPF(customer.cpf);
      const name = new Name(customer.name);
      const email = new Email(customer.email);
      const phone = new Phone(customer.phone);

      return new Customer(id, cpf, name, email, phone);
    });

    return mappedCustomers;
  }

  async getCustomerById(id: Id): Promise<Customer | null> {
    const customer = await this.customerDataSource.findById(id.id);

    const customerId = new Id(customer.id);
    const cpf = new CPF(customer.cpf);
    const name = new Name(customer.name);
    const email = new Email(customer.email);
    const phone = new Phone(customer.phone);

    return new Customer(customerId, cpf, name, email, phone);
  }

  async createCustomer(customer: ParamsForCustomerCreation): Promise<Customer> {
    const createdCustomer = await this.customerDataSource.create({
      cpf: customer.cpf.cpf,
      name: customer.name.name,
      email: customer.email.email,
      phone: customer.phone.phone,
    });

    const id = new Id(createdCustomer.id);
    const cpf = new CPF(createdCustomer.cpf);
    const name = new Name(createdCustomer.name);
    const email = new Email(createdCustomer.email);
    const phone = new Phone(createdCustomer.phone);

    return new Customer(id, cpf, name, email, phone);
  }

  async updateCustomer(customer: Customer): Promise<Customer> {
    const updatedCustomer = await this.customerDataSource.update({
      id: customer.id,
      cpf: customer.cpf,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });

    const id = new Id(updatedCustomer.id);
    const cpf = new CPF(updatedCustomer.cpf);
    const name = new Name(updatedCustomer.name);
    const email = new Email(updatedCustomer.email);
    const phone = new Phone(updatedCustomer.phone);

    return new Customer(id, cpf, name, email, phone);
  }

  async removeCustomer(id: Id): Promise<Customer> {
    const removedCustomer = await this.customerDataSource.remove(id.id);

    const customerId = new Id(removedCustomer.id);
    const cpf = new CPF(removedCustomer.cpf);
    const name = new Name(removedCustomer.name);
    const email = new Email(removedCustomer.email);
    const phone = new Phone(removedCustomer.phone);

    return new Customer(customerId, cpf, name, email, phone);
  }
}
