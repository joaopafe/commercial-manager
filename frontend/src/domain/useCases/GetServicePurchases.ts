import { PurchaseRepository } from "../repositories/PurchaseRepository";

export class GetServicePurchases {
  constructor(private purchaseRepository: PurchaseRepository) {}

  async exec() {
    const servicePurchases =
      await this.purchaseRepository.listServicePurchases();

    const orderedPurchases = servicePurchases?.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    if (orderedPurchases) return orderedPurchases;

    return servicePurchases;
  }
}
