import { ServicePurchase } from "../entities/ServicePurchase";
import { ProductPurchase } from "../entities/ProductPurchase";

import { AddServicePurchaseParams } from "../useCases/CreateServicePurchase";
import { AddProductPurchaseParams } from "../useCases/CreateProductPurchase";

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
  addProductPurchase(
    productPurchase: AddProductPurchaseParams
  ): Promise<ProductPurchase | Error>;
  editProductPurchase(
    productPurchase: ProductPurchase
  ): Promise<ProductPurchase | Error>;
}
