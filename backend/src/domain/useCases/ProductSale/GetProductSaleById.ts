import { ProductSaleRepository } from "../../repositories/ProductSaleRepository";

import { Id } from "../../entities/shared/Id";

import { ProductSaleError } from "../../entities/errors/ProductSaleError";

export class GetProductSaleById {
  constructor(private productSaleRepository: ProductSaleRepository) {}

  async exec(id: number) {
    const productSaleExists =
      await this.productSaleRepository.getProductSaleById(new Id(id));

    if (!productSaleExists)
      throw new ProductSaleError(
        "product_sale_not_found",
        "Product sale does not exist"
      );

    const productSaleId = new Id(id);

    return await this.productSaleRepository.getProductSaleById(productSaleId);
  }
}
