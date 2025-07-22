import { SaleRepository } from "../repositories/SaleRepository";

export class GetProductSales {
  constructor(private productSaleRepository: SaleRepository) {}

  async exec() {
    const productSales = await this.productSaleRepository.listProductSales();

    return productSales;
  }
}
