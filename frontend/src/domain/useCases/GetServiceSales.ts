import { SaleRepository } from "../repositories/SaleRepository";

export class GetServiceSales {
  constructor(private serviceSaleRepository: SaleRepository) {}

  async execute() {
    const serviceSales = await this.serviceSaleRepository.listServiceSales();

    return serviceSales;
  }
}
