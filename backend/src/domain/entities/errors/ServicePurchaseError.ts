export const servicePurchaseErrorCodes = [
  "internal_server_error",
  "service_purchase_not_found",
  "id_is_invalid",
  "supplier_id_is_invalid",
  "name_is_invalid",
  "value_is_invalid",
  "date_is_invalid",
] as const;

export type ServicePurchaseErrorCode =
  (typeof servicePurchaseErrorCodes)[number];

export class ServicePurchaseError extends Error {
  private _code: ServicePurchaseErrorCode;

  constructor(code: ServicePurchaseErrorCode, message: string) {
    super(message);
    this._code = code;
  }

  get code(): string {
    return this._code;
  }
}
