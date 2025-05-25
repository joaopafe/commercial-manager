import { Sale } from "../entities/Sale";

export interface SaleDataSource {
  listLatest(): Promise<Sale[] | null>;
}

export class SaleRepository {
  constructor(private mock: SaleDataSource) {}

  async listLatest(): Promise<Sale[] | null> {
    const latestSales = await this.mock.listLatest();

    if (latestSales === null) return null;

    return latestSales;
  }
}
