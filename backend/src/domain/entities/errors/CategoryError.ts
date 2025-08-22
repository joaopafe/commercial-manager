export const categoryErrorCodes = [
  "internal_server_error",
  "category_not_found",
  "id_is_invalid",
  "name_is_invalid",
] as const;

export type CategoryErrorCode = (typeof categoryErrorCodes)[number];

export class CategoryError extends Error {
  private _code: CategoryErrorCode;

  constructor(code: CategoryErrorCode, message: string) {
    super(message);
    this._code = code;
  }

  get code(): CategoryErrorCode {
    return this._code;
  }
}
