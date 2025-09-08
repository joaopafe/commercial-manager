import { ProductPurchaseError } from "./errors/ProductPurchaseError";

import { Id } from "./shared/Id";

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
      throw new ProductPurchaseError(
        "supplier_id_is_invalid",
        "The supplier id cannot be less than or equal to zero"
      );

    if (!Number.isInteger(this._supplierId))
      throw new ProductPurchaseError(
        "supplier_id_is_invalid",
        "The supplier id must be an integer"
      );
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
      throw new ProductPurchaseError(
        "item_id_is_invalid",
        "The item id cannot be less than or equal to zero"
      );

    if (!Number.isInteger(this._itemId))
      throw new ProductPurchaseError(
        "item_id_is_invalid",
        "The item id must be an integer"
      );
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
      throw new ProductPurchaseError(
        "quantity_is_invalid",
        "The purchase quantity cannot be less or equal to zero"
      );

    if (!Number.isInteger(this._quantity))
      throw new ProductPurchaseError(
        "quantity_is_invalid",
        "The purchase quantity must be an integer"
      );
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
      throw new ProductPurchaseError(
        "value_is_invalid",
        "The product purchase value cannot be less to zero"
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
      throw new ProductPurchaseError(
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

export class ProductPurchase {
  private _id: Id;
  private _supplierId: SupplierId;
  private _itemId: ItemId;
  private _quantity: Quantity;
  private _value: Value;
  private _date: PurchaseDate;

  constructor(
    id: Id,
    supplierId: SupplierId,
    itemId: ItemId,
    quantity: Quantity,
    value: Value,
    date: PurchaseDate
  ) {
    this._id = id;
    this._supplierId = supplierId;
    this._itemId = itemId;
    this._quantity = quantity;
    this._value = value;
    this._date = date;
  }

  get id(): number {
    return this._id.id;
  }

  get supplierId(): number {
    return this._supplierId.supplierId;
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

  toObject(): object {
    return {
      id: this._id,
      supplierId: this._supplierId,
      itemId: this._itemId,
      quantity: this._quantity,
      value: this._value,
      date: this._date,
    };
  }
}
