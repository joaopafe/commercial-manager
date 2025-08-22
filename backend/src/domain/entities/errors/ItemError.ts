export const itemErrorCodes = [
  "internal_server_error",
  "item_not_found",
  "id_is_invalid",
  "name_is_invalid",
  "category_id_is_invalid",
  "price_is_invalid",
  "supplier_id_is_invalid",
  "stock_quantity_is_invalid",
] as const;

export type ItemErrorCode = (typeof itemErrorCodes)[number];

export class ItemError extends Error {
  private _code: ItemErrorCode;

  constructor(code: ItemErrorCode, message: string) {
    super(message);
    this._code = code;
  }

  get code(): ItemErrorCode {
    return this._code;
  }
}
