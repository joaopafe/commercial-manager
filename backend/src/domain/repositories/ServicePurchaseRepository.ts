import { Id } from "../entities/shared/Id";

import {
  SupplierId,
  Name,
  Value,
  PurchaseDate,
  ServicePurchase,
} from "../entities/ServicePurchase";

export interface ParamsForServicePurchaseCreation {
  supplierId: SupplierId;
  name: Name;
  value: Value;
  date: PurchaseDate;
}

export interface ServicePurchaseRepository {
  getAllServicePurchases(): Promise<ServicePurchase[] | null>;
  getServicePurchaseById(id: Id): Promise<ServicePurchase | null>;
  createServicePurchase(
    servicePurchase: ParamsForServicePurchaseCreation
  ): Promise<ServicePurchase>;
  updateServicePurchase(
    servicePurchase: ServicePurchase
  ): Promise<ServicePurchase>;
  removeServicePurchase(id: Id): Promise<ServicePurchase>;
}
