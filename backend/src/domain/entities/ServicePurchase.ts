import { ServicePurchaseError } from "./errors/ServicePurchaseError";

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
      throw new ServicePurchaseError(
        "id_is_invalid",
        "The service purchase id cannot be less than or equal to zero"
      );
    }

    if (!Number.isInteger(this._id)) {
      throw new ServicePurchaseError(
        "id_is_invalid",
        "The service purchase id must be an integer"
      );
    }
  }
}

class SupplierId {
  private _supplierId: number;

  constructor(supplierId: number) {
    this._supplierId = supplierId;

    this.validate();
  }

  get supplierId(): number {
    return this._supplierId;
  }

  validate() {
    if (this._supplierId <= 0)
      throw new ServicePurchaseError(
        "supplier_id_is_invalid",
        "The supplier id cannot be less than or equal to zero"
      );

    if (!Number.isInteger(this._supplierId))
      throw new ServicePurchaseError(
        "supplier_id_is_invalid",
        "The supplier id must be an integer"
      );
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
      throw new ServicePurchaseError(
        "name_is_invalid",
        "The service purchase name cannot be less than 3 characters"
      );
    }
  }
}

class Value {
  private _value: number;

  constructor(value: number) {
    this._value = value;

    this.validate();
  }

  get value(): number {
    return this._value;
  }

  validate() {
    if (this._value < 0)
      throw new ServicePurchaseError(
        "value_is_invalid",
        "The service purchase value cannot be less to zero"
      );
  }
}

class PurchaseDate {
  private _date: Date;

  constructor(date: Date) {
    this._date = date;

    this.validate();
  }

  get date(): Date {
    return this._date;
  }

  validate() {
    if (!(this._date instanceof Date) || isNaN(this._date.getTime())) {
      throw new ServicePurchaseError(
        "date_is_invalid",
        "The service purchase date is invalid"
      );
    }
  }

  toString(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}

export class ServicePurchase {
  private _id: Id;
  private _supplierId: SupplierId;
  private _name: Name;
  private _value: Value;
  private _date: PurchaseDate;

  constructor(
    id: Id,
    supplierId: SupplierId,
    name: Name,
    value: Value,
    date: PurchaseDate
  ) {
    (this._id = id), (this._supplierId = supplierId);
    this._name = name;
    this._value = value;
    this._date = date;
  }

  get id(): number {
    return this._id.id;
  }

  get supplierId(): number {
    return this._supplierId.supplierId;
  }

  get name(): string {
    return this._name.name;
  }

  get value(): number {
    return this._value.value;
  }

  get date(): Date {
    return this._date.date;
  }

  toObject(): object {
    return {
      id: this._id,
      supplierId: this._supplierId,
      name: this._name,
      value: this._value,
      date: this._date,
    };
  }
}
