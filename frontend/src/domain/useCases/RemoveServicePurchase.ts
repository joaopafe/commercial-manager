import { ServicePurchase } from "../entities/ServicePurchase";

import { PurchaseRepository } from "../repositories/PurchaseRepository";

import { servicePurchaseAlreadyExists } from "../validators/servicePurchaseAlreadtExists";

export class RemoveServicePurchase {
  constructor(private purchaseRepository: PurchaseRepository) {}

  async exec(servicePurchaseCode: number): Promise<ServicePurchase | Error> {
    const servicePurchases =
      await this.purchaseRepository.listServicePurchases();

    if (servicePurchases) {
      const servicePurchaseExists = servicePurchaseAlreadyExists(
        servicePurchaseCode,
        servicePurchases
      );

      if (servicePurchaseExists) {
        const removedServicePurchase =
          await this.purchaseRepository.removeServicePurchase(
            servicePurchaseCode
          );

        return removedServicePurchase;
      }
    }

    return Error("It was not possible to remove the service purchase");
  }
}
