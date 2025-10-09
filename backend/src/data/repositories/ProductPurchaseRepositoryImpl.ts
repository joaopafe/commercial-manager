import {
  SupplierId,
  ItemId,
  Quantity,
  Value,
  PurchaseDate,
  ProductPurchase,
} from "../../domain/entities/ProductPurchase";
import { Id } from "../../domain/entities/shared/Id";

import {
  ProductPurchaseRepository,
  ParamsForProductPurchaseCreation,
} from "../../domain/repositories/ProductPurchaseRepository";

export interface ProductPurchaseData {
  id: number;
  supplierId: number;
  itemId: number;
  quantity: number;
  value: number;
  date: Date;
}

export interface ProductPurchaseDataSource {
  createTable(): Promise<boolean>;
  findAll(): Promise<ProductPurchaseData[]>;
  findById(id: number): Promise<ProductPurchaseData>;
  create(
    productPurchase: Omit<ProductPurchaseData, "id">
  ): Promise<ProductPurchaseData>;
  update(productPurchase: ProductPurchaseData): Promise<ProductPurchaseData>;
  remove(id: number): Promise<ProductPurchaseData>;
}

export class ProductPurchaseRepositoryImpl
  implements ProductPurchaseRepository
{
  constructor(private produtctPurchaseDataSource: ProductPurchaseDataSource) {}

  async getAllProductPurchases(): Promise<ProductPurchase[] | null> {
    const productPurchases = await this.produtctPurchaseDataSource.findAll();

    const mappedProductPurchases = productPurchases.map((productPurchase) => {
      const id = new Id(productPurchase.id);
      const supplierId = new SupplierId(productPurchase.supplierId);
      const itemId = new ItemId(productPurchase.itemId);
      const quantity = new Quantity(productPurchase.quantity);
      const value = new Value(productPurchase.value);
      const date = new PurchaseDate(productPurchase.date);

      return new ProductPurchase(id, supplierId, itemId, quantity, value, date);
    });

    return mappedProductPurchases;
  }

  async getProductPurchaseById(id: Id): Promise<ProductPurchase | null> {
    const productPurchase = await this.produtctPurchaseDataSource.findById(
      id.id
    );

    const productPurchaseId = new Id(productPurchase.id);
    const supplierId = new SupplierId(productPurchase.supplierId);
    const itemId = new ItemId(productPurchase.itemId);
    const quantity = new Quantity(productPurchase.quantity);
    const value = new Value(productPurchase.value);
    const date = new PurchaseDate(productPurchase.date);

    return new ProductPurchase(
      productPurchaseId,
      supplierId,
      itemId,
      quantity,
      value,
      date
    );
  }

  async createProductPurchase(
    productPurchase: ParamsForProductPurchaseCreation
  ): Promise<ProductPurchase> {
    const createdProductPurchase = await this.produtctPurchaseDataSource.create(
      {
        supplierId: productPurchase.supplierId.supplierId,
        itemId: productPurchase.itemId.itemId,
        quantity: productPurchase.quantity.quantity,
        value: productPurchase.value.value,
        date: productPurchase.date.date,
      }
    );

    const id = new Id(createdProductPurchase.id);
    const supplierId = new SupplierId(createdProductPurchase.supplierId);
    const itemId = new ItemId(createdProductPurchase.itemId);
    const quantity = new Quantity(createdProductPurchase.quantity);
    const value = new Value(createdProductPurchase.value);
    const date = new PurchaseDate(createdProductPurchase.date);

    return new ProductPurchase(id, supplierId, itemId, quantity, value, date);
  }

  async updateProductPurchase(
    productPurchase: ProductPurchase
  ): Promise<ProductPurchase> {
    const updatedProductPurchase = await this.produtctPurchaseDataSource.update(
      {
        id: productPurchase.id,
        supplierId: productPurchase.supplierId,
        itemId: productPurchase.itemId,
        quantity: productPurchase.quantity,
        value: productPurchase.value,
        date: productPurchase.date,
      }
    );

    const id = new Id(updatedProductPurchase.id);
    const supplierId = new SupplierId(updatedProductPurchase.supplierId);
    const itemId = new ItemId(updatedProductPurchase.itemId);
    const quantity = new Quantity(updatedProductPurchase.quantity);
    const value = new Value(updatedProductPurchase.value);
    const date = new PurchaseDate(updatedProductPurchase.date);

    return new ProductPurchase(id, supplierId, itemId, quantity, value, date);
  }

  async removeProductPurchase(id: Id): Promise<ProductPurchase> {
    const removedProductPurchase = await this.produtctPurchaseDataSource.remove(
      id.id
    );

    const removedProductPurchaseId = new Id(removedProductPurchase.id);
    const supplierId = new SupplierId(removedProductPurchase.supplierId);
    const itemId = new ItemId(removedProductPurchase.itemId);
    const quantity = new Quantity(removedProductPurchase.quantity);
    const value = new Value(removedProductPurchase.value);
    const date = new PurchaseDate(removedProductPurchase.date);

    return new ProductPurchase(
      removedProductPurchaseId,
      supplierId,
      itemId,
      quantity,
      value,
      date
    );
  }
}
