import { CustomerRepository } from "../repositories/CustomerRepository";

export class GetCustomers {
  constructor(private customerRepository: CustomerRepository) {}

  async exec() {
    const customers = await this.customerRepository.list();

    return customers;
  }
}
