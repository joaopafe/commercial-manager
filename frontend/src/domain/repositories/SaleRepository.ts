import { Sale } from "../entities/Sale";
import { TodaySales } from "../entities/TodaySales";

export interface SaleRepository {
  listLatest(): Promise<Sale[] | null>;
  listTodaySales(): Promise<TodaySales | null>;
}
