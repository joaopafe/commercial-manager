import { CustomerRepository } from "../../repositories/CustomerRepository";

import { CPF, Name, Email, Phone, Customer } from "../../entities/Customer";

export interface AddCustomerParams {
  cpf: string;
  name: string;
  email: string;
  phone: string;
}

export class AddCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async exec(customer: AddCustomerParams) {
    const cpf = new CPF(customer.cpf);
    const name = new Name(customer.name);
    const email = new Email(customer.email);
    const phone = new Phone(customer.phone);

    return await this.customerRepository.createCustomer({
      cpf,
      name,
      email,
      phone,
    });
  }
}
