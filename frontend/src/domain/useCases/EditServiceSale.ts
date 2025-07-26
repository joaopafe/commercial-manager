import { ServiceSale } from "../entities/ServiceSale";

import { SaleRepository } from "../repositories/SaleRepository";
import { CustomerRepository } from "../repositories/CustomerRepository";

import { isValidServiceSale as validServiceSale } from "../validators/isValidServiceSale";
import { serviceSaleAlreadyExists } from "../validators/serviceSaleAlreadyExists";
import { customerAlreadyExists } from "../validators/customerAlreadyExists";

export class EditServiceSale {
  constructor(
    private saleRepository: SaleRepository,
    private customerRepository: CustomerRepository
  ) {}

  async exec(serviceSale: ServiceSale) {
    const isValidServiceSale = validServiceSale(serviceSale);
    if (!isValidServiceSale) return Error("The service sale is invalid");

    const customers = await this.customerRepository.list();
    const serviceSales = await this.saleRepository.listServiceSales();

    if (customers && serviceSales) {
      const serviceSaleExists = serviceSaleAlreadyExists(
        serviceSale.id,
        serviceSales
      );
      const customerExists = customerAlreadyExists(
        serviceSale.clientId,
        customers
      );

      if (serviceSaleExists && customerExists) {
        const editedServiceSale = await this.saleRepository.editServiceSale(
          serviceSale
        );

        return editedServiceSale;
      }

      return serviceSaleExists
        ? Error("The customer is invalid")
        : Error("The service sale is invalid");
    }

    return Error("It was not possible to edit service sale");
  }
}
