import { PieceStockCategory } from "../entities/PieceStockCategory";

export interface StockDataSource {
  list(): Promise<PieceStockCategory[] | null>;
}

export class StockRepository {
  constructor(private mock: StockDataSource) {}

  async list(): Promise<PieceStockCategory[] | null> {
    const partsStockCategories = await this.mock.list();

    if (partsStockCategories === null) return null;

    return partsStockCategories;
  }
}
