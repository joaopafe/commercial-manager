import { TotalInCash } from "../entities/TotalInCash";

export interface CashDataSource {
  listInputs(): Promise<number[] | null>;
  listOutputs(): Promise<number[] | null>;
}

export class TotalInCashRepository {
  constructor(private cashFlow: CashDataSource) {}

  private async getTotalInOrOut(params: { isCashInput: boolean }) {
    const registers: number[] | null = params.isCashInput
      ? await this.cashFlow.listInputs()
      : await this.cashFlow.listOutputs();

    if (registers && registers.length > 0) {
      let totalRegistered = 0;

      for (const register of registers) totalRegistered += register;

      return totalRegistered;
    } else if (registers?.length === 0) return 0;

    return null;
  }

  async getTotalInCash(): Promise<TotalInCash> {
    const totalInput = await this.getTotalInOrOut({ isCashInput: true });
    const totalOutput = await this.getTotalInOrOut({ isCashInput: false });

    if (totalInput && totalOutput) return totalInput - totalOutput;

    return null;
  }
}
