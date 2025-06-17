import { SaleRepository } from "../repositories/SaleRepository";

export class GetLatestSales {
  constructor(private saleRepository: SaleRepository) {}

  async execute() {
    const latestSales = await this.saleRepository.listLatest();

    if (latestSales === null) Error("Unable to get latest sales");

    return latestSales;
  }
}
