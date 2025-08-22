export const productSaleErrorCodes = [
  "internal_server_error",
  "product_sale_not_found",
  "id_is_invalid",
  "customer_id_is_invalid",
  "item_id_is_invalid",
  "quantity_is_invalid",
  "value_is_invalid",
  "date_is_invalid",
] as const;

export type ProductSaleErrorCode = (typeof productSaleErrorCodes)[number];

export class ProductSaleError extends Error {
  private _code: ProductSaleErrorCode;

  constructor(code: ProductSaleErrorCode, message: string) {
    super(message);
    this._code = code;
  }

  get code(): ProductSaleErrorCode {
    return this._code;
  }
}
