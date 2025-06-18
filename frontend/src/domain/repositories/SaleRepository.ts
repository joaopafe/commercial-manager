import { Sale } from "../entities/Sale";

export interface SaleRepository {
  listLatest(): Promise<Sale[] | null>;
}
