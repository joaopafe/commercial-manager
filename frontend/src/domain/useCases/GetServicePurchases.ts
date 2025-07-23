import { PurchaseRepository } from "../repositories/PurchaseRepository";

export class GetServicePurchases {
  constructor(private purchaseRepository: PurchaseRepository) {}

  async exec() {
    const servicePurchases =
      await this.purchaseRepository.listServicePurchases();

    return servicePurchases;
  }
}
