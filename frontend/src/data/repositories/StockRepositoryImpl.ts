import { StockGroup } from "../../domain/entities/StockGroup";

import { StockRepository } from "../../domain/repositories/StockRepository";

export interface StockDataSource {
  list(): Promise<StockGroup[] | null>;
}

export class StockRepositoryImpl implements StockRepository {
  constructor(private dataSource: StockDataSource) {}

  async list(): Promise<StockGroup[] | null> {
    const partsStockCategories = await this.dataSource.list();

    return partsStockCategories;
  }
}
