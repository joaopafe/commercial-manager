import { Sale } from "../../domain/entities/Sale";
import { TodaySales } from "../../domain/entities/TodaySales";

import { SaleRepository } from "../../domain/repositories/SaleRepository";

export interface SaleDataSource {
  listLatest(): Promise<Sale[] | null>;
}

export class SaleRepositoryImpl implements SaleRepository {
  constructor(private dataSource: SaleDataSource) {}

  async listLatest(): Promise<Sale[] | null> {
    const latestSales = await this.dataSource.listLatest();

    return latestSales;
  }

  async listTodaySales(): Promise<TodaySales | null> {
    const latestSales = await this.dataSource.listLatest();

    if (latestSales && latestSales.length > 0) {
      let todaySales = 0;

      for (const sale of latestSales) {
        todaySales += sale.value;
      }

      return todaySales;
    }

    if (latestSales === null) return null;

    return 0;
  }
}
