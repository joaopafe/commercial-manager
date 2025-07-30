import { SaleRepository } from "../repositories/SaleRepository";

export class GetProductSales {
  constructor(private productSaleRepository: SaleRepository) {}

  async exec() {
    const productSales = await this.productSaleRepository.listProductSales();

    const orderedSales = productSales?.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    if (orderedSales) return orderedSales;

    return productSales;
  }
}
