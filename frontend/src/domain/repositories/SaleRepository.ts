import { ServiceSale } from "../entities/ServiceSale";
import { ProductSale } from "../entities/ProductSale";

import { AddServiceSaleParams } from "../useCases/CreateServiceSale";
import { AddProductSaleParams } from "../useCases/CreateProductSale";

export interface SaleRepository {
  listServiceSales(): Promise<ServiceSale[] | null>;
  listProductSales(): Promise<ProductSale[] | null>;
  addServiceSale(
    serviceSale: AddServiceSaleParams
  ): Promise<ServiceSale | Error>;
  editServiceSale(serviceSale: ServiceSale): Promise<ServiceSale | Error>;
  removeServiceSale(serviceSaleCode: number): Promise<ServiceSale | Error>;
  addProductSale(
    productSale: AddProductSaleParams
  ): Promise<ProductSale | Error>;
}
