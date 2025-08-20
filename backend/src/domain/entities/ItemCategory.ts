class Id {
  private _id: number;

  constructor(id: number) {
    this._id = id;

    this.validate();
  }

  get id(): number {
    return this._id;
  }

  validate() {
    if (this._id <= 0) {
      throw new Error("The category id cannot be less than or equal to zero");
    }

    if (!Number.isInteger(this._id)) {
      throw new Error("The category id must be an integer");
    }
  }
}

class Name {
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
      throw new Error("The name cannot be less than 3 characters");
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
