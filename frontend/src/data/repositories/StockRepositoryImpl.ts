import { StockGroup } from "../../domain/entities/StockGroup";

import { StockRepository } from "../../domain/repositories/StockRepository";

export interface StockDataSource {
  list(): Promise<StockGroup[] | null>;
  insertStock(
    pieceCode: number,
    quantity: number
  ): Promise<StockGroup[] | Error>;
  removeStock(
    pieceCode: number,
    quantity: number
  ): Promise<StockGroup[] | Error>;
}

export class StockRepositoryImpl implements StockRepository {
  constructor(private dataSource: StockDataSource) {}

  async list(): Promise<StockGroup[] | null> {
    const partsStockCategories = await this.dataSource.list();

    return partsStockCategories;
  }

  async insertStock(
    pieceCode: number,
    quantity: number
  ): Promise<StockGroup[] | Error> {
    const stockGroups = await this.dataSource.insertStock(pieceCode, quantity);

    return stockGroups;
  }

  async removeStock(
    pieceCode: number,
    quantity: number
  ): Promise<StockGroup[] | Error> {
    const stockGroups = await this.dataSource.removeStock(pieceCode, quantity);

    return stockGroups;
  }
}
