import { CategoryError } from "./errors/CategoryError";

import { Id } from "./shared/Id";

export class Name {
  private _name: string;

  constructor(name: string) {
    this._name = name.trim();

    this.validate();
  }

  get name(): string {
    return this._name;
  }

  validate() {
    if (this._name.length <= 3) {
      throw new CategoryError(
        "name_is_invalid",
        "The name cannot be less than 3 characters"
      );
    }
  }
}

export class ItemCategory {
  private _id: Id;
  private _name: Name;

  constructor(id: Id, name: Name) {
    (this._id = id), (this._name = name);
  }

  get id(): number {
    return this._id.id;
  }

  get name(): string {
    return this._name.name;
  }

  toObject(): object {
    return {
      id: this._id,
      name: this._name,
    };
  }
}
