import { ServiceSale } from "../entities/ServiceSale";
import { ProductSale } from "../entities/ProductSale";
import { AddServiceSaleParams } from "../useCases/CreateServiceSale";

export interface SaleRepository {
  listServiceSales(): Promise<ServiceSale[] | null>;
  listProductSales(): Promise<ProductSale[] | null>;
  addServiceSale(
    serviceSale: AddServiceSaleParams
  ): Promise<ServiceSale | Error>;
  editServiceSale(serviceSale: ServiceSale): Promise<ServiceSale | Error>;
}
