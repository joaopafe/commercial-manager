import { Customer } from "../entities/Customer";

import { AddCustomerParams } from "../useCases/CreateCustomer";

export interface CustomerRepository {
  list(): Promise<Customer[] | null>;
  create(customer: AddCustomerParams): Promise<Customer | Error>;
  edit(customer: Customer): Promise<Customer | Error>;
}
