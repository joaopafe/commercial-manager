import { StockRepository } from "../repositories/StockRepository";

export class GetStockGroup {
  constructor(private stockRepository: StockRepository) {}

  async exec() {
    const stockGroups = await this.stockRepository.list();

    if (stockGroups === null) Error("Unable to get stock groups");

    return stockGroups;
  }
}
