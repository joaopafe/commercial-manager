import { Customer } from "../entities/Customer";

import { CustomerRepository } from "../repositories/CustomerRepository";

import { customerAlreadyExists } from "../validators/customerAlreadyExists";

export class RemoveCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async exec(customerCode: number): Promise<Customer | Error> {
    const customers = await this.customerRepository.list();

    if (customers) {
      const customerExists = customerAlreadyExists(customerCode, customers);

      if (customerExists) {
        const removedCustomer = await this.customerRepository.remove(
          customerCode
        );

        return removedCustomer;
      }
    }

    return Error("It was not possible to remove the customer");
  }
}
