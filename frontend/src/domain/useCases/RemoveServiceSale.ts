import { ServiceSale } from "../entities/ServiceSale";

import { SaleRepository } from "../repositories/SaleRepository";

import { serviceSaleAlreadyExists } from "../validators/serviceSaleAlreadyExists";

export class RemoveServiceSale {
  constructor(private saleRepository: SaleRepository) {}

  async exec(serviceSaleCode: number): Promise<ServiceSale | Error> {
    const serviceSales = await this.saleRepository.listServiceSales();

    if (serviceSales) {
      const serviceSaleExists = serviceSaleAlreadyExists(
        serviceSaleCode,
        serviceSales
      );

      if (serviceSaleExists) {
        const removedServiceSale = await this.saleRepository.removeServiceSale(
          serviceSaleCode
        );

        return removedServiceSale;
      }
    }

    return Error("It was not possible to remove the service sale");
  }
}
