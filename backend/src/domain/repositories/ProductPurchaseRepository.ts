import { Id } from "../entities/shared/Id";

import {
  SupplierId,
  ItemId,
  Quantity,
  Value,
  PurchaseDate,
  ProductPurchase,
} from "../entities/ProductPurchase";

export interface ParamsForProductPurchaseCreation {
  supplierId: SupplierId;
  itemId: ItemId;
  quantity: Quantity;
  value: Value;
  date: PurchaseDate;
}

export interface ProductPurchaseRepository {
  getAllProductPurchases(): Promise<ProductPurchase[] | null>;
  getProductPurchaseById(id: Id): Promise<ProductPurchase | null>;
  createProductPurchase(
    productPurchase: ParamsForProductPurchaseCreation
  ): Promise<ProductPurchase>;
  updateProductPurchase(
    productPurchase: ProductPurchase
  ): Promise<ProductPurchase>;
  removeProductPurchase(id: Id): Promise<ProductPurchase>;
}
