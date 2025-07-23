import { PurchaseRepository } from "../repositories/PurchaseRepository";

export class GetProductPurchases {
  constructor(private purchaseRepository: PurchaseRepository) {}

  async exec() {
    const productPurchases =
      await this.purchaseRepository.listProductPurchases();

    return productPurchases;
  }
}
