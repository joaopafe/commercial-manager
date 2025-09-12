import { ProductSaleRepository } from "../../repositories/ProductSaleRepository";

import { DomainError } from "../../entities/errors/DomainError";

export class GetAllProductSales {
  constructor(private productSaleRepository: ProductSaleRepository) {}

  async exec() {
    const productSales = await this.productSaleRepository.getAllProductSales();

    if (productSales === null)
      throw new DomainError(
        "unknown",
        "It was not possible to get the product sales"
      );

    return productSales;
  }
}
