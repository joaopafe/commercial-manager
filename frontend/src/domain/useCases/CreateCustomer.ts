import { Customer } from "../entities/Customer";

import { CustomerRepository } from "../repositories/CustomerRepository";

import { isValidCPF as validCPF } from "../validators/isValidCPF";
import { isValidEmail as validEmail } from "../validators/isValidEmail.ts";
import { isValidPhone as validPhone } from "../validators/isValidPhone";

export interface AddCustomerParams {
  cpf: string;
  name: string;
  phone: string;
  email: string;
}

export class CreateCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async exec(customer: AddCustomerParams): Promise<Customer | Error> {
    const isValidCPF = validCPF(customer.cpf);
    const isValidName = customer.name.length >= 3;
    const isValidEmail = validEmail(customer.email);
    const isValidPhone = validPhone(customer.phone);

    const isValidCustomer =
      isValidCPF && isValidName && isValidEmail && isValidPhone;

    if (isValidCustomer) {
      const createdCustomer = await this.customerRepository.create(customer);

      return createdCustomer;
    }

    if (!isValidCustomer) {
      if (!isValidCPF) {
        return Error("The customer cpf is invalid");
      }

      if (!isValidName) {
        return Error("The customer name is invalid");
      }

      if (!isValidEmail) {
        return Error("The customer email is invalid");
      }

      if (!isValidPhone) {
        return Error("The customer phone is invalid");
      }
    }

    return Error("It was not possible to create customer");
  }
}
