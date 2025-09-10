import { CPF, Name, Email, Phone, Customer } from "../entities/Customer";
import { Id } from "../entities/shared/Id";

export interface ParamsForCustomerCreation {
  cpf: CPF;
  name: Name;
  email: Email;
  phone: Phone;
}

export interface CustomerRepository {
  getAllCustomers(): Promise<Customer[] | null>;
  getCustomerById(id: Id): Promise<Customer | null>;
  createCustomer(customer: ParamsForCustomerCreation): Promise<Customer>;
  updateCustomer(customer: Customer): Promise<Customer>;
  removeCustomer(id: Id): Promise<Customer>;
}
