export const userErrorCodes = [
  "internal_server_error",
  "user_not_found",
  "id_is_invalid",
  "username_is_invalid",
  "password_is_invalid",
  "invalid_credentials",
] as const;

export type UserErrorCode = (typeof userErrorCodes)[number];

export class UserError extends Error {
  private _code: UserErrorCode;

  constructor(code: UserErrorCode, message: string) {
    super(message);
    this._code = code;
  }

  get code(): string {
    return this._code;
  }
}
