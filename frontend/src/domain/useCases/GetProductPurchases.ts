import { PurchaseRepository } from "../repositories/PurchaseRepository";

export class GetProductPurchases {
  constructor(private purchaseRepository: PurchaseRepository) {}

  async exec() {
    const productPurchases =
      await this.purchaseRepository.listProductPurchases();

    const orderedPurchases = productPurchases?.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    if (orderedPurchases) return orderedPurchases;

    return productPurchases;
  }
}
