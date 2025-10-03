import {
  CustomerId,
  ItemId,
  Quantity,
  Value,
  SaleDate,
  ProductSale,
} from "../../domain/entities/ProductSale";
import { Id } from "../../domain/entities/shared/Id";

import {
  ProductSaleRepository,
  ParamsForProductSaleCreation,
} from "../../domain/repositories/ProductSaleRepository";

export interface ProductSaleData {
  id: number;
  customerId: number;
  itemId: number;
  quantity: number;
  value: number;
  date: Date;
}

export interface ProductSaleDataSource {
  createTable(): Promise<boolean>;
  findAll(): Promise<ProductSaleData[]>;
  findById(id: number): Promise<ProductSaleData>;
  create(productSale: Omit<ProductSaleData, "id">): Promise<ProductSaleData>;
  update(productSale: ProductSaleData): Promise<ProductSaleData>;
  remove(id: number): Promise<ProductSaleData>;
}

export class ProductSaleRepositoryImpl implements ProductSaleRepository {
  constructor(private productSaleDataSource: ProductSaleDataSource) {}

  async getAllProductSales(): Promise<ProductSale[] | null> {
    const productSales = await this.productSaleDataSource.findAll();

    const mappedProductSales = productSales.map((productSale) => {
      const id = new Id(productSale.id);
      const customerId = new CustomerId(productSale.customerId);
      const itemId = new ItemId(productSale.itemId);
      const quantity = new Quantity(productSale.quantity);
      const value = new Value(productSale.value);
      const date = new SaleDate(productSale.date);

      return new ProductSale(id, customerId, itemId, quantity, value, date);
    });

    return mappedProductSales;
  }

  async getProductSaleById(id: Id): Promise<ProductSale | null> {
    const productSale = await this.productSaleDataSource.findById(id.id);

    const productSaleId = new Id(productSale.id);
    const customerId = new CustomerId(productSale.customerId);
    const itemId = new ItemId(productSale.itemId);
    const quantity = new Quantity(productSale.quantity);
    const value = new Value(productSale.value);
    const date = new SaleDate(productSale.date);

    return new ProductSale(
      productSaleId,
      customerId,
      itemId,
      quantity,
      value,
      date
    );
  }

  async createProductSale(
    productSale: ParamsForProductSaleCreation
  ): Promise<ProductSale> {
    const createdProductSale = await this.productSaleDataSource.create({
      customerId: productSale.customerId.customerId,
      itemId: productSale.itemId.itemId,
      quantity: productSale.quantity.quantity,
      value: productSale.value.value,
      date: productSale.date.date,
    });

    const id = new Id(createdProductSale.id);
    const customerId = new CustomerId(createdProductSale.customerId);
    const itemId = new ItemId(createdProductSale.itemId);
    const quantity = new Quantity(createdProductSale.quantity);
    const value = new Value(createdProductSale.value);
    const date = new SaleDate(createdProductSale.date);

    return new ProductSale(id, customerId, itemId, quantity, value, date);
  }

  async updateProductSale(productSale: ProductSale): Promise<ProductSale> {
    const updatedProductSale = await this.productSaleDataSource.update({
      id: productSale.id,
      customerId: productSale.customerId,
      itemId: productSale.itemId,
      quantity: productSale.quantity,
      value: productSale.value,
      date: productSale.date,
    });

    const id = new Id(updatedProductSale.id);
    const customerId = new CustomerId(updatedProductSale.customerId);
    const itemId = new ItemId(productSale.itemId);
    const quantity = new Quantity(productSale.quantity);
    const value = new Value(productSale.value);
    const date = new SaleDate(productSale.date);

    return new ProductSale(id, customerId, itemId, quantity, value, date);
  }

  async removeProductSale(id: Id): Promise<ProductSale> {
    const removedProductSale = await this.productSaleDataSource.remove(id.id);

    const productSaleId = new Id(removedProductSale.id);
    const customerId = new CustomerId(removedProductSale.customerId);
    const itemId = new ItemId(removedProductSale.itemId);
    const quantity = new Quantity(removedProductSale.quantity);
    const value = new Value(removedProductSale.value);
    const date = new SaleDate(removedProductSale.date);

    return new ProductSale(
      productSaleId,
      customerId,
      itemId,
      quantity,
      value,
      date
    );
  }
}
