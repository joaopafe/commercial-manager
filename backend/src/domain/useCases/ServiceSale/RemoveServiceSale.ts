import { ServiceSaleRepository } from "../../repositories/ServiceSaleRepository";

import { Id } from "../../entities/shared/Id";

import { ServiceSaleError } from "../../entities/errors/ServiceSaleError";

export class RemoveServiceSale {
  constructor(private serviceSaleRepository: ServiceSaleRepository) {}

  async exec(id: number) {
    const serviceSaleExists =
      await this.serviceSaleRepository.getServiceSaleById(new Id(id));
    if (serviceSaleExists === null)
      throw new ServiceSaleError(
        "service_sale_not_found",
        "The service sale id does not exist"
      );

    return await this.serviceSaleRepository.removeServiceSale(new Id(id));
  }
}
