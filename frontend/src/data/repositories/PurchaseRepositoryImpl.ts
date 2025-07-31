import { ServicePurchase } from "../../domain/entities/ServicePurchase";
import { ProductPurchase } from "../../domain/entities/ProductPurchase";

import { AddServicePurchaseParams } from "../../domain/useCases/CreateServicePurchase";

import { PurchaseRepository } from "../../domain/repositories/PurchaseRepository";

export interface PurchaseDataSource {
  listServicePurchases(): Promise<ServicePurchase[] | null>;
  listProductPurchases(): Promise<ProductPurchase[] | null>;
  addServicePurchase(
    servicePurchase: AddServicePurchaseParams
  ): Promise<ServicePurchase | Error>;
  editServicePurchase(
    servicePurchase: ServicePurchase
  ): Promise<ServicePurchase | Error>;
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

  async addServicePurchase(
    servicePurchase: AddServicePurchaseParams
  ): Promise<ServicePurchase | Error> {
    const createdServicePurchase = await this.dataSource.addServicePurchase(
      servicePurchase
    );

    return createdServicePurchase;
  }

  async editServicePurchase(
    servicePurchase: ServicePurchase
  ): Promise<ServicePurchase | Error> {
    const editedServicePurchase = await this.dataSource.editServicePurchase(
      servicePurchase
    );

    return editedServicePurchase;
  }
}
