import { Id } from "../entities/shared/Id";

import {
  CustomerId,
  Name,
  Value,
  SaleDate,
  ServiceSale,
} from "../entities/ServiceSale";

export interface ParamsForServiceSaleCreation {
  customerId: CustomerId;
  name: Name;
  value: Value;
  date: SaleDate;
}

export interface ServiceSaleRepository {
  getAllServiceSales(): Promise<ServiceSale[] | null>;
  getServiceSaleById(id: Id): Promise<ServiceSale | null>;
  createServiceSale(
    serviceSale: ParamsForServiceSaleCreation
  ): Promise<ServiceSale>;
  updateServiceSale(serviceSale: ServiceSale): Promise<ServiceSale>;
  removeServiceSale(id: Id): Promise<ServiceSale>;
}
