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
}
