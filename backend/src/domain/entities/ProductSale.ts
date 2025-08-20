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
      throw new Error(
        "The product sale id cannot be less than or equal to zero"
      );
    }

    if (!Number.isInteger(this._id)) {
      throw new Error("The product sale id must be an integer");
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
      throw new Error("The customer id cannot be less than or equal to zero");

    if (!Number.isInteger(this._customerId))
      throw new Error("The customer id must be an integer");
  }
}

class ItemId {
  private _itemId: number;

  constructor(itemId: number) {
    this._itemId = itemId;

    this.validate();
  }

  get itemId(): number {
    return this._itemId;
  }

  validate() {
    if (this._itemId <= 0)
      throw new Error("The item id cannot be less than or equal to zero");

    if (!Number.isInteger(this._itemId))
      throw new Error("The item id must be an integer");
  }
}

class Quantity {
  private _quantity: number;

  constructor(quantity: number) {
    this._quantity = quantity;

    this.validate();
  }

  get quantity(): number {
    return this._quantity;
  }

  validate() {
    if (this._quantity <= 0)
      throw new Error("The sale quantity cannot be less or equal to zero");

    if (!Number.isInteger(this._quantity))
      throw new Error("The sale quantity must be an integer");
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
      throw new Error("The product sale value cannot be less to zero");
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
      throw new Error("The service sale date is invalid");
    }
  }

  toString(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}

export class ProductSale {
  private _id: Id;
  private _customerId: CustomerId;
  private _itemId: ItemId;
  private _quantity: Quantity;
  private _value: Value;
  private _date: SaleDate;

  constructor(
    id: Id,
    customerId: CustomerId,
    itemId: ItemId,
    quantity: Quantity,
    value: Value,
    date: SaleDate
  ) {
    (this._id = id),
      (this._customerId = customerId),
      (this._itemId = itemId),
      (this._quantity = quantity),
      (this._value = value),
      (this._date = date);
  }

  get id(): number {
    return this._id.id;
  }

  get customerId(): number {
    return this._customerId.customerId;
  }

  get itemId(): number {
    return this._itemId.itemId;
  }

  get quantity(): number {
    return this._quantity.quantity;
  }

  get value(): number {
    return this._value.value;
  }

  get date(): Date {
    return this._date.date;
  }
}
