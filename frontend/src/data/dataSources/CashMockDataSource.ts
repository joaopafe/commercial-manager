import { CashDataSource } from "../repositories/TotalInCashRepositoryImpl";

import { delay } from "../../shared/utils/delay";

const cashFlowInputsMock: number[] = [
  555.4, 768.9, 12.0, 18.4, 109.99, 88.15, 202.1, 1_000, 234, 45, 100,
];

const cashFlowOutputsMock: number[] = [
  455.99, 48.8, 109.99, 88.15, 202.1, 234, 45, 100,
];

export class CashMockDataSource implements CashDataSource {
  async listInputs(): Promise<number[] | null> {
    await delay(2_000);

    return cashFlowInputsMock;
  }

  async listOutputs(): Promise<number[] | null> {
    await delay(2_000);

    return cashFlowOutputsMock;
  }
}
