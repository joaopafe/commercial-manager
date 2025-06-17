export interface TotalInCashRepository {
  getTotalInOrOut(params: { isCashInput: boolean }): Promise<number | null>;
  getTotalInCash(): Promise<number | null>;
}
