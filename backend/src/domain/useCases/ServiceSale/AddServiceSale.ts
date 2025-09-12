import { ServiceSaleRepository } from "../../repositories/ServiceSaleRepository";
import { CustomerRepository } from "../../repositories/CustomerRepository";

import { CustomerId, Name, Value, SaleDate } from "../../entities/ServiceSale";
import { Id } from "../../entities/shared/Id";

import { ServiceSaleError } from "../../entities/errors/ServiceSaleError";

export interface AddServiceSaleParams {
  customerId: number;
  name: string;
  value: number;
  date: Date;
}

export class AddServiceSale {
  constructor(
    private serviceSaleRepository: ServiceSaleRepository,
    private customerRepository: CustomerRepository
  ) {}

  async exec(serviceSale: AddServiceSaleParams) {
    const customerExists = await this.customerRepository.getCustomerById(
      new Id(serviceSale.customerId)
    );
    if (!customerExists)
      throw new ServiceSaleError(
        "customer_id_is_invalid",
        "The customer id does not exist"
      );
    const customerId = new CustomerId(serviceSale.customerId);

    const name = new Name(serviceSale.name);
    const value = new Value(serviceSale.value);
    const date = new SaleDate(serviceSale.date);

    return await this.serviceSaleRepository.createServiceSale({
      customerId,
      name,
      value,
      date,
    });
  }
}
