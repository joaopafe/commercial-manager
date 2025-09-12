import { ServiceSaleRepository } from "../../repositories/ServiceSaleRepository";
import { CustomerRepository } from "../../repositories/CustomerRepository";

import {
  CustomerId,
  Name,
  Value,
  SaleDate,
  ServiceSale,
} from "../../entities/ServiceSale";
import { Id } from "../../entities/shared/Id";

import { ServiceSaleError } from "../../entities/errors/ServiceSaleError";

import { AddServiceSaleParams } from "./AddServiceSale";

export interface UpdateServiceSaleParams extends AddServiceSaleParams {
  id: number;
}

export class UpdateServiceSale {
  constructor(
    private serviceSaleRepository: ServiceSaleRepository,
    private customerRepository: CustomerRepository
  ) {}

  async exec(serviceSale: UpdateServiceSaleParams) {
    const serviceSaleExists =
      await this.serviceSaleRepository.getServiceSaleById(
        new Id(serviceSale.id)
      );
    if (serviceSaleExists === null)
      throw new ServiceSaleError(
        "service_sale_not_found",
        "The service sale id does not exist"
      );
    const id = new Id(serviceSale.id);

    const customerExists = await this.customerRepository.getCustomerById(
      new Id(serviceSale.customerId)
    );
    if (customerExists === null)
      throw new ServiceSaleError(
        "customer_id_is_invalid",
        "The customer id does not exist"
      );
    const customerId = new CustomerId(serviceSale.customerId);

    const name = new Name(serviceSale.name);
    const value = new Value(serviceSale.value);
    const date = new SaleDate(serviceSale.date);

    return await this.serviceSaleRepository.updateServiceSale(
      new ServiceSale(id, customerId, name, value, date)
    );
  }
}
