import { ServiceSaleRepository } from "../../repositories/ServiceSaleRepository";

import { DomainError } from "../../entities/errors/DomainError";

export class GetAllServiceSales {
  constructor(private serviceSaleRepository: ServiceSaleRepository) {}

  async exec() {
    const serviceSales = await this.serviceSaleRepository.getAllServiceSales();

    if (serviceSales === null)
      throw new DomainError(
        "unknown",
        "It was not possible to get the service sales"
      );

    return serviceSales;
  }
}
