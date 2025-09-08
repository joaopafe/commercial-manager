import { DomainError } from "../errors/DomainError";

export class Id {
  private _id: number;

  constructor(id: number) {
    this._id = id;

    this.validate();
  }

  get id() {
    return this._id;
  }

  validate() {
    if (this._id <= 0) {
      throw new DomainError(
        "invalid_value",
        "The id cannot be less than or equal to zero"
      );
    }

    if (!Number.isInteger(this._id)) {
      throw new DomainError("invalid_value", "The id must be an integer");
    }
  }
}
