import { Sale } from "../entities/Sale";
import { TodaySales } from "../entities/TodaySales";

import { SaleDataSource } from "./SaleRepository";

export class TodaySalesRepository {
  constructor(private mock: SaleDataSource) {}

  private async getLatestSales(): Promise<Sale[] | null> {
    return await this.mock.listLatest();
  }

  async getTodaySales(): Promise<TodaySales> {
    const latestSales: Sale[] | null = await this.getLatestSales();

    if (latestSales && latestSales.length > 0) {
      let todaySales: number = 0;

      for (const sale of latestSales) {
        todaySales += sale.value;
      }

      return todaySales;
    }

    if (latestSales === null) return null;

    return 0;
  }
}
