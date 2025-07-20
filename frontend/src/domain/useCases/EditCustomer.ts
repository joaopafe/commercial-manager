import { Customer } from "../entities/Customer";

import { CustomerRepository } from "../repositories/CustomerRepository";

import { isValidCPF as validCPF } from "../validators/isValidCPF";
import { isValidEmail as validEmail } from "../validators/isValidEmail";
import { isValidPhone as validPhone } from "../validators/isValidPhone";
import { customerAlreadyExists } from "../validators/customerAlreadyExists";

export class EditCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async exec(customer: Customer): Promise<Customer | Error> {
    const isValidCPF = validCPF(customer.cpf);
    const isValidEmail = validEmail(customer.email);
    const isValidPhone = validPhone(customer.phone);
    const isValidName = customer.name.length >= 3;

    const isValidCustomer =
      isValidCPF && isValidEmail && isValidPhone && isValidName;

    if (isValidCustomer) {
      const customers = await this.customerRepository.list();

      if (customers) {
        const customerExists = customerAlreadyExists(customer.code, customers);

        if (customerExists) {
          const editedCustomer = await this.customerRepository.edit(customer);

          return editedCustomer;
        }

        return Error("The customer code is invalid");
      }

      return Error("It was not possible to edit customer");
    }

    if (!isValidCustomer) {
      if (!isValidCPF) {
        return Error("The customer CPF is invalid");
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

    return Error("It was not possible to edit customer");
  }
}
