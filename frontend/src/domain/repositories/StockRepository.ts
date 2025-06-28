import { StockGroup } from "../entities/StockGroup";

export interface StockRepository {
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
