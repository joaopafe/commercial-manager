import { ProductPurchase } from "../entities/ProductPurchase";

import { PurchaseRepository } from "../repositories/PurchaseRepository";

import { productPurchaseAlreadyExists } from "../validators/productPurchaseAlreadyExists";

export class RemoveProductPurchase {
  constructor(private purchaseRepository: PurchaseRepository) {}

  async exec(productPurchaseCode: number): Promise<ProductPurchase | Error> {
    const productPurchases =
      await this.purchaseRepository.listProductPurchases();

    if (productPurchases) {
      const productPurchaseExists = productPurchaseAlreadyExists(
        productPurchaseCode,
        productPurchases
      );

      if (productPurchaseExists) {
        const removedProductPurchase =
          await this.purchaseRepository.removeProductPurchase(
            productPurchaseCode
          );

        return removedProductPurchase;
      }
    }

    return Error("It was not possible to remove the product purchase");
  }
}
