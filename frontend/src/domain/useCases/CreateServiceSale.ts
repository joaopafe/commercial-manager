import { ServiceSale } from "../entities/ServiceSale";

import { SaleRepository } from "../repositories/SaleRepository";
import { CustomerRepository } from "../repositories/CustomerRepository";

import { isValidServiceSale as validServiceSale } from "../validators/isValidServiceSale";
import { customerAlreadyExists } from "../validators/customerAlreadyExists";

export interface AddServiceSaleParams {
  clientId: number;
  name: string;
  value: number;
  date: Date;
}

export class CreateServiceSale {
  constructor(
    private saleRepository: SaleRepository,
    private customerRepository: CustomerRepository
  ) {}

  async exec(serviceSale: AddServiceSaleParams): Promise<ServiceSale | Error> {
    const isValidServiceSale = validServiceSale(serviceSale);
    if (!isValidServiceSale) return Error("The service sale is invalid");

    const customers = await this.customerRepository.list();

    if (customers) {
      const customerExists = customerAlreadyExists(
        serviceSale.clientId,
        customers
      );

      if (customerExists) {
        const registeredServiceSale = await this.saleRepository.addServiceSale(
          serviceSale
        );

        return registeredServiceSale;
      }

      if (!customerExists) return Error("The customer code is invalid");
    }

    if (customers === null)
      return Error("It was not possible to get the customers");

    return Error("It was not possible to register the service sale");
  }
}
