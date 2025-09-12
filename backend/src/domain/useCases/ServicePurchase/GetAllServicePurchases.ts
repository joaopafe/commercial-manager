import { ServicePurchaseRepository } from "../../repositories/ServicePurchaseRepository";

import { DomainError } from "../../entities/errors/DomainError";

export class GetAllServicePurchases {
  constructor(private servicePurchaseRepository: ServicePurchaseRepository) {}

  async exec() {
    const servicePurchases =
      await this.servicePurchaseRepository.getAllServicePurchases();

    if (servicePurchases === null)
      throw new DomainError(
        "unknown",
        "It was not possible to get the service purchases"
      );

    return servicePurchases;
  }
}
