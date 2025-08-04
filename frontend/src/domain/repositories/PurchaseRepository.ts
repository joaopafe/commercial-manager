import { ServicePurchase } from "../entities/ServicePurchase";
import { ProductPurchase } from "../entities/ProductPurchase";

import { AddServicePurchaseParams } from "../useCases/CreateServicePurchase";

export interface PurchaseRepository {
  listServicePurchases(): Promise<ServicePurchase[] | null>;
  listProductPurchases(): Promise<ProductPurchase[] | null>;
  addServicePurchase(
    servicePurchase: AddServicePurchaseParams
  ): Promise<ServicePurchase | Error>;
  editServicePurchase(
    servicePurchase: ServicePurchase
  ): Promise<ServicePurchase | Error>;
  removeServicePurchase(
    servicePurchaseCode: number
  ): Promise<ServicePurchase | Error>;
}
