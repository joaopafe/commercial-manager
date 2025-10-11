import { ProductPurchaseRepository } from "../../repositories/ProductPurchaseRepository";

import { Id } from "../../entities/shared/Id";

import { ProductPurchaseError } from "../../entities/errors/ProductPurchaseError";

export class GetProductPurchaseById {
  constructor(private productPurchaseRepository: ProductPurchaseRepository) {}

  async exec(id: number) {
    const productPurchaseExists =
      await this.productPurchaseRepository.getProductPurchaseById(new Id(id));

    if (!productPurchaseExists)
      throw new ProductPurchaseError(
        "product_purchase_not_found",
        "Product purchase does not exist"
      );

    const productPurchaseId = new Id(id);

    return await this.productPurchaseRepository.getProductPurchaseById(
      productPurchaseId
    );
  }
}
