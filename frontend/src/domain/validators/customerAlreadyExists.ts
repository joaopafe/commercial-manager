import { Customer } from "../entities/Customer";

export const customerAlreadyExists = (
  customerCode: number,
  customers: Customer[]
) => {
  const customerAlreadyExists =
    customers.filter((customer) => {
      return customer.code === customerCode;
    }).length === 1;

  return customerAlreadyExists;
};
