import { Id } from "../entities/shared/Id";

import {
  CustomerId,
  ItemId,
  Quantity,
  Value,
  SaleDate,
  ProductSale,
} from "../entities/ProductSale";

export interface ParamsForProductSaleCreation {
  customerId: CustomerId;
  itemId: ItemId;
  quantity: Quantity;
  value: Value;
  date: SaleDate;
}

export interface ProductSaleRepository {
  getAllProductSales(): Promise<ProductSale[] | null>;
  getProductSaleById(id: Id): Promise<ProductSale | null>;
  createProductSale(
    productSale: ParamsForProductSaleCreation
  ): Promise<ProductSale>;
  updateProductSale(productSale: ProductSale): Promise<ProductSale>;
  removeProductSale(id: Id): Promise<ProductSale>;
}
