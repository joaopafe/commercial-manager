import { ServiceSale } from "../entities/ServiceSale";
import { ProductSale } from "../entities/ProductSale";

export interface SaleRepository {
  listServiceSales(): Promise<ServiceSale[] | null>;
  listProductSales(): Promise<ProductSale[] | null>;
}
