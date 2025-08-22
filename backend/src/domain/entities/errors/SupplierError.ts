export const supplierErrorCodes = [
  "internal_server_error",
  "supplier_not_found",
  "id_is_invalid",
  "cnpj_is_invalid",
  "name_is_invalid",
  "phone_is_invalid",
] as const;

export type SupplierErrorCode = (typeof supplierErrorCodes)[number];

export class SupplierError extends Error {
  private _code: SupplierErrorCode;

  constructor(code: SupplierErrorCode, message: string) {
    super(message);
    this._code = code;
  }

  get code(): SupplierErrorCode {
    return this._code;
  }
}
