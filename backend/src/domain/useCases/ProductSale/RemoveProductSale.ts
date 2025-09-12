import { ProductSaleRepository } from "../../repositories/ProductSaleRepository";

import { Id } from "../../entities/shared/Id";

import { ProductSaleError } from "../../entities/errors/ProductSaleError";

export class RemoveProductSale {
  constructor(private productSaleRepository: ProductSaleRepository) {}

  async exec(id: number) {
    const productSaleExists =
      await this.productSaleRepository.getProductSaleById(new Id(id));
    if (!productSaleExists)
      throw new ProductSaleError(
        "product_sale_not_found",
        "The product sale id does not exist"
      );

    return await this.productSaleRepository.removeProductSale(new Id(id));
  }
}
