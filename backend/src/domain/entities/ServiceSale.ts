import { ServiceSaleError } from "./errors/ServiceSaleError";

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
      throw new ServiceSaleError(
        "id_is_invalid",
        "The service sale id cannot be less than or equal to zero"
      );
    }

    if (!Number.isInteger(this._id)) {
      throw new ServiceSaleError(
        "id_is_invalid",
        "The service sale id must be an integer"
      );
    }
  }
}

class CustomerId {
  private _customerId: number;

  constructor(customerId: number) {
    this._customerId = customerId;

    this.validate();
  }

  get customerId(): number {
    return this._customerId;
  }

  validate() {
    if (this._customerId <= 0)
      throw new ServiceSaleError(
        "customer_id_is_invalid",
        "The customer id cannot be less than or equal to zero"
      );

    if (!Number.isInteger(this._customerId))
      throw new ServiceSaleError(
        "customer_id_is_invalid",
        "The customer id must be an integer"
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
      throw new ServiceSaleError(
        "name_is_invalid",
        "The service sale name cannot be less than 3 characters"
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
      throw new ServiceSaleError(
        "value_is_invalid",
        "The service sale value cannot be less to zero"
      );
  }
}

class SaleDate {
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
      throw new ServiceSaleError(
        "date_is_invalid",
        "The service sale date is invalid"
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

export class ServiceSale {
  private _id: Id;
  private _customerId: CustomerId;
  private _name: Name;
  private _value: Value;
  private _date: SaleDate;

  constructor(
    id: Id,
    customerId: CustomerId,
    name: Name,
    value: Value,
    date: SaleDate
  ) {
    this._id = id;
    this._customerId = customerId;
    this._name = name;
    this._value = value;
    this._date = date;
  }

  get id(): number {
    return this._id.id;
  }

  get customerId(): number {
    return this._customerId.customerId;
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
      customerId: this._customerId,
      name: this._name,
      value: this._value,
      date: this._date,
    };
  }
}
