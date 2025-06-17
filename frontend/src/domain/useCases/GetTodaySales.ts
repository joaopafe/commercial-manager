import { SaleRepository } from "../repositories/SaleRepository";

export class GetTodaySales {
  constructor(private saleRepository: SaleRepository) {}

  async execute() {
    const todaySales = await this.saleRepository.listTodaySales();

    if (todaySales === null) Error("Unable to get today's sales");

    return todaySales;
  }
}
