import { CustomerRepository } from "../../repositories/CustomerRepository";

import { CPF, Name, Email, Phone, Customer } from "../../entities/Customer";
import { Id } from "../../entities/shared/Id";

import { CustomerError } from "../../entities/errors/CustomerError";

import { AddCustomerParams } from "./AddCustomer";

export interface UpdateCustomerParams extends AddCustomerParams {
  id: number;
}

export class UpdateCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async exec(customer: UpdateCustomerParams) {
    const customerExists = await this.customerRepository.getCustomerById(
      new Id(customer.id)
    );
    if (!customerExists)
      throw new CustomerError(
        "customer_not_found",
        "The customer id does not exist"
      );
    const id = new Id(customer.id);

    const cpf = new CPF(customer.cpf);

    const name = new Name(customer.name);

    const email = new Email(customer.email);

    const phone = new Phone(customer.phone);

    return await this.customerRepository.updateCustomer(
      new Customer(id, cpf, name, email, phone)
    );
  }
}
