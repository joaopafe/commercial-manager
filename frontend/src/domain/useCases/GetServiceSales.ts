import { SaleRepository } from "../repositories/SaleRepository";

export class GetServiceSales {
  constructor(private serviceSaleRepository: SaleRepository) {}

  async exec() {
    const serviceSales = await this.serviceSaleRepository.listServiceSales();

    const orderedSales = serviceSales?.sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    if (orderedSales) return orderedSales;

    return serviceSales;
  }
}
