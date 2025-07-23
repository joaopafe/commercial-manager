import { ServicePurchase } from "../entities/ServicePurchase";
import { ProductPurchase } from "../entities/ProductPurchase";

export interface PurchaseRepository {
  listServicePurchases(): Promise<ServicePurchase[] | null>;
  listProductPurchases(): Promise<ProductPurchase[] | null>;
}
