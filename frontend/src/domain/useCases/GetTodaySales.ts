import { TodaySales } from "../entities/TodaySales";

import { SaleRepository } from "../repositories/SaleRepository";

export class GetTodaySales {
  constructor(private saleRepository: SaleRepository) {}

  async execute(): Promise<TodaySales | Error> {
    const latestSales = await this.saleRepository.listLatest();

    if (latestSales && latestSales.length > 0) {
      let todaySales = 0;

      for (const sale of latestSales) {
        todaySales += sale.value;
      }

      return todaySales;
    }

    if (latestSales === null) Error("Unable to get today's sales");

    return 0;
  }
}
