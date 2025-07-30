import { ProductSale } from "../entities/ProductSale";

import { SaleRepository } from "../repositories/SaleRepository";

import { productSaleAlreadyExists } from "../validators/productSaleAlreadyExists";

export class RemoveProductSale {
  constructor(private saleRepository: SaleRepository) {}

  async exec(productSaleCode: number): Promise<ProductSale | Error> {
    const productSales = await this.saleRepository.listProductSales();

    if (productSales) {
      const productSaleExists = productSaleAlreadyExists(
        productSaleCode,
        productSales
      );

      if (productSaleExists) {
        const removedProductSale = await this.saleRepository.removeProductSale(
          productSaleCode
        );

        return removedProductSale;
      }
    }

    return Error("It was not possible to remove the product sale");
  }
}
