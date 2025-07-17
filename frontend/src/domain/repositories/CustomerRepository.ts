import { Customer } from "../entities/Customer";

export interface CustomerRepository {
  list(): Promise<Customer[] | null>;
}
