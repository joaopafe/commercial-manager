import { ServicePurchase } from "../../domain/entities/ServicePurchase";
import { ProductPurchase } from "../../domain/entities/ProductPurchase";

import { PurchaseRepository } from "../../domain/repositories/PurchaseRepository";

export interface PurchaseDataSource {
  listServicePurchases(): Promise<ServicePurchase[] | null>;
  listProductPurchases(): Promise<ProductPurchase[] | null>;
}

export class PurchaseRepositoryImpl implements PurchaseRepository {
  constructor(private dataSource: PurchaseDataSource) {}

  async listServicePurchases(): Promise<ServicePurchase[] | null> {
    const servicePurchases = await this.dataSource.listServicePurchases();

    return servicePurchases;
  }

  async listProductPurchases(): Promise<ProductPurchase[] | null> {
    const productPurchases = await this.dataSource.listProductPurchases();

    return productPurchases;
  }
}
