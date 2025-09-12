import { ProductPurchaseRepository } from "../../repositories/ProductPurchaseRepository";

import { Id } from "../../entities/shared/Id";

import { ProductPurchaseError } from "../../entities/errors/ProductPurchaseError";

export class RemoveProductPurchase {
  constructor(private productPurchaseRepository: ProductPurchaseRepository) {}

  async exec(id: number) {
    const productPurchaseExists =
      await this.productPurchaseRepository.getProductPurchaseById(new Id(id));
    if (!productPurchaseExists)
      throw new ProductPurchaseError(
        "product_purchase_not_found",
        "The product purchase id does not exist"
      );

    return await this.productPurchaseRepository.removeProductPurchase(
      new Id(id)
    );
  }
}
