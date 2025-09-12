import { ProductPurchaseRepository } from "../../repositories/ProductPurchaseRepository";

import { DomainError } from "../../entities/errors/DomainError";

export class GetAllProductPurchases {
  constructor(private productPurchaseRepository: ProductPurchaseRepository) {}

  async exec() {
    const productPurchases =
      await this.productPurchaseRepository.getAllProductPurchases();

    if (productPurchases === null)
      throw new DomainError(
        "unknown",
        "It was not possible to get the product purchases"
      );

    return productPurchases;
  }
}
