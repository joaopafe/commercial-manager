import { ServiceSale } from "../../domain/entities/ServiceSale";
import { ProductSale } from "../../domain/entities/ProductSale";

import { AddServiceSaleParams } from "../../domain/useCases/CreateServiceSale";

import { SaleRepository } from "../../domain/repositories/SaleRepository";

export interface SaleDataSource {
  listServiceSales(): Promise<ServiceSale[] | null>;
  listProductSales(): Promise<ProductSale[] | null>;
  addServiceSale(
    serviceSale: AddServiceSaleParams
  ): Promise<ServiceSale | Error>;
  editServiceSale(serviceSale: ServiceSale): Promise<ServiceSale | Error>;
}

export class SaleRepositoryImpl implements SaleRepository {
  constructor(private dataSource: SaleDataSource) {}

  async listServiceSales(): Promise<ServiceSale[] | null> {
    const serviceSales = await this.dataSource.listServiceSales();

    return serviceSales;
  }

  async listProductSales(): Promise<ProductSale[] | null> {
    const productSales = await this.dataSource.listProductSales();

    return productSales;
  }

  async addServiceSale(
    serviceSale: AddServiceSaleParams
  ): Promise<ServiceSale | Error> {
    const registeredServiceSale = await this.dataSource.addServiceSale(
      serviceSale
    );

    return registeredServiceSale;
  }

  async editServiceSale(
    serviceSale: ServiceSale
  ): Promise<ServiceSale | Error> {
    const editedServiceSale = await this.dataSource.editServiceSale(
      serviceSale
    );

    return editedServiceSale;
  }
}
