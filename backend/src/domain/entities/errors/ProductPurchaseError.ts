export const productPurchaseErrorCodes = [
  "internal_server_error",
  "product_purchase_not_found",
  "id_is_invalid",
  "supplier_id_is_invalid",
  "item_id_is_invalid",
  "quantity_is_invalid",
  "value_is_invalid",
  "date_is_invalid",
] as const;

export type ProductPurchaseErrorCode =
  (typeof productPurchaseErrorCodes)[number];

export class ProductPurchaseError extends Error {
  private _code: ProductPurchaseErrorCode;

  constructor(code: ProductPurchaseErrorCode, message: string) {
    super(message);
    this._code = code;
  }

  get code(): ProductPurchaseErrorCode {
    return this._code;
  }
}
