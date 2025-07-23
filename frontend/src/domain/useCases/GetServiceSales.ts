import { SaleRepository } from "../repositories/SaleRepository";

export class GetServiceSales {
  constructor(private serviceSaleRepository: SaleRepository) {}

  async exec() {
    const serviceSales = await this.serviceSaleRepository.listServiceSales();

    return serviceSales;
  }
}
