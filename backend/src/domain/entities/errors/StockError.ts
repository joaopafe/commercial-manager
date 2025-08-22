export const stockErrorCodes = [
  "internal_server_error",
  "stock_item_not_found",
  "id_is_invalid",
  "quantity_invalid",
] as const;

export type StockErrorCode = (typeof stockErrorCodes)[number];

export class StockError extends Error {
  private _code: StockErrorCode;

  constructor(code: StockErrorCode, message: string) {
    super(message);
    this._code = code;
  }

  get code(): StockErrorCode {
    return this._code;
  }
}
