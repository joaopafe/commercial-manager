import { ServicePurchaseRepository } from "../../repositories/ServicePurchaseRepository";

import { Id } from "../../entities/shared/Id";

import { ServicePurchaseError } from "../../entities/errors/ServicePurchaseError";

export class RemoveServicePurchase {
  constructor(private servicePurchaseRepository: ServicePurchaseRepository) {}

  async exec(id: number) {
    const servicePurchaseExists =
      await this.servicePurchaseRepository.getServicePurchaseById(new Id(id));
    if (!servicePurchaseExists)
      throw new ServicePurchaseError(
        "service_purchase_not_found",
        "The service purchase id does not exist"
      );

    return await this.servicePurchaseRepository.removeServicePurchase(
      new Id(id)
    );
  }
}
