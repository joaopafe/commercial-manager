import { StockGroup } from "../entities/StockGroup";

export interface StockRepository {
  list(): Promise<StockGroup[] | null>;
}
