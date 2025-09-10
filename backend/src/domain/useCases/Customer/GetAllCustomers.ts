import { CustomerRepository } from "../../repositories/CustomerRepository";

import { DomainError } from "../../entities/errors/DomainError";

export class GetAllCustomers {
  constructor(private customerRepository: CustomerRepository) {}

  async exec() {
    const customers = await this.customerRepository.getAllCustomers();

    if (customers === null)
      throw new DomainError(
        "unknown",
        "It was not possible to get the customers"
      );

    return customers;
  }
}
