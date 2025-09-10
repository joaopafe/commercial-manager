import { CustomerRepository } from "../../repositories/CustomerRepository";

import { Id } from "../../entities/shared/Id";

import { CustomerError } from "../../entities/errors/CustomerError";

export class RemoveCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async exec(id: number) {
    const customerExists = await this.customerRepository.getCustomerById(
      new Id(id)
    );
    if (!customerExists)
      throw new CustomerError(
        "customer_not_found",
        "The customer id does not exist"
      );

    return await this.customerRepository.removeCustomer(new Id(id));
  }
}
