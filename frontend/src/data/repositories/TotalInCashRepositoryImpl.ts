import { TotalInCash } from "../../domain/entities/TotalInCash";
import { TotalInCashRepository } from "../../domain/repositories/TotalInCashRepository";

export interface CashDataSource {
  listInputs(): Promise<number[] | null>;
  listOutputs(): Promise<number[] | null>;
}

export class TotalInCashRepositoryImpl implements TotalInCashRepository {
  constructor(private dataSource: CashDataSource) {}

  async getTotalInOrOut(params: { isCashInput: boolean }) {
    const registers: number[] | null = params.isCashInput
      ? await this.dataSource.listInputs()
      : await this.dataSource.listOutputs();

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
