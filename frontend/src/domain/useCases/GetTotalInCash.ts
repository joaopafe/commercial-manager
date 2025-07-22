import { TotalInCashRepository } from "../repositories/TotalInCashRepository";

export class GetTotalInCash {
  constructor(private totalInCashRepository: TotalInCashRepository) {}

  async exec() {
    const totalInCash = await this.totalInCashRepository.getTotalInCash();

    if (totalInCash === null) Error("Unable to get total cash on hand");

    return totalInCash;
  }
}
