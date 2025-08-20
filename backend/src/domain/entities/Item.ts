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
      throw new Error("The item id cannot be less than or equal to zero");
    }

    if (!Number.isInteger(this._id)) {
      throw new Error("The item id must be an integer");
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
      throw new Error("The item name cannot be less than 3 characters");
    }
  }
}

class CategoryId {
  private _categoryId: number;

  constructor(categoryId: number) {
    this._categoryId = categoryId;

    this.validate();
  }

  get categoryId(): number {
    return this._categoryId;
  }

  validate() {
    if (this._categoryId <= 0) {
      throw new Error("The category id cannot be less than or equal to zero");
    }

    if (!Number.isInteger(this._categoryId)) {
      throw new Error("The category id must be an integer");
    }
  }
}

class Price {
  private _price: number;

  constructor(price: number) {
    this._price = price;

    this.validate();
  }

  get price(): number {
    return this._price;
  }

  toString(): string {
    return this._price.toString();
  }

  validate() {
    if (this._price <= 0) {
      throw new Error("The price cannot be less than or equal to zero");
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
    if (this._supplierId <= 0) {
      throw new Error("The supplier id cannot be less than or equal to zero");
    }

    if (!Number.isInteger(this._supplierId)) {
      throw new Error("The supplier id must be an integer");
    }
  }
}

class StockQuantity {
  private _stockQuantity: number;

  constructor(stockQuantity: number) {
    this._stockQuantity = stockQuantity;

    this.validate();
  }

  get stockQuantity(): number {
    return this._stockQuantity;
  }

  validate() {
    if (this._stockQuantity <= 0) {
      throw new Error("The stock quantity cannot be less than zero");
    }

    if (!Number.isInteger(this._stockQuantity)) {
      throw new Error("The stock quantity must be an integer");
    }
  }
}

export class Item {
  private _id: Id;
  private _name: Name;
  private _categoryId: CategoryId;
  private _price: Price;
  private _supplierId: SupplierId;
  private _stockQuantity: StockQuantity;

  constructor(
    id: Id,
    name: Name,
    categoryId: CategoryId,
    price: Price,
    supplierId: SupplierId,
    stockQuantity: StockQuantity
  ) {
    (this._id = id),
      (this._name = name),
      (this._categoryId = categoryId),
      (this._price = price),
      (this._supplierId = supplierId),
      (this._stockQuantity = stockQuantity);
  }

  get id(): number {
    return this._id.id;
  }

  get name(): string {
    return this._name.name;
  }

  get categoryId(): number {
    return this._categoryId.categoryId;
  }

  get price(): number {
    return this._price.price;
  }

  get supplierId(): number {
    return this._supplierId.supplierId;
  }

  get stockQuantity(): number {
    return this._stockQuantity.stockQuantity;
  }

  toObject(): object {
    return {
      id: this._id,
      name: this._name,
      categoryId: this._categoryId,
      price: this._price,
      supplierId: this._supplierId,
      stockQuantity: this._stockQuantity,
    };
  }
}
