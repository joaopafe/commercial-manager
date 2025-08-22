export const customerErrorCodes = [
  "internal_server_error",
  "customer_not_found",
  "id_is_invalid",
  "cpf_is_invalid",
  "name_is_invalid",
  "email_is_invalid",
  "phone_is_invalid",
] as const;

export type CustomerErrorCode = (typeof customerErrorCodes)[number];

export class CustomerError extends Error {
  private _code: CustomerErrorCode;

  constructor(code: CustomerErrorCode, message: string) {
    super(message);
    this._code = code;
  }

  get code() {
    return this._code;
  }
}
