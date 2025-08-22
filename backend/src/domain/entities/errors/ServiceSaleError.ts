export const serviceSaleCodes = [
  "internal_server_error",
  "service_sale_not_found",
  "id_is_invalid",
  "customer_id_is_invalid",
  "name_is_invalid",
  "value_is_invalid",
  "date_is_invalid",
] as const;

export type ServiceSaleErrorCode = (typeof serviceSaleCodes)[number];

export class ServiceSaleError extends Error {
  private _code: ServiceSaleErrorCode;

  constructor(code: ServiceSaleErrorCode, message: string) {
    super(message);
    this._code = code;
  }

  get code(): string {
    return this._code;
  }
}
