import { ServiceSale } from "../../domain/entities/ServiceSale";
import { ProductSale } from "../../domain/entities/ProductSale";

import { AddServiceSaleParams } from "../../domain/useCases/CreateServiceSale";
import { AddProductSaleParams } from "../../domain/useCases/CreateProductSale";

import { SaleRepository } from "../../domain/repositories/SaleRepository";

export interface SaleDataSource {
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
  editProductSale(productSale: ProductSale): Promise<ProductSale | Error>;
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

  async removeServiceSale(
    serviceSaleCode: number
  ): Promise<ServiceSale | Error> {
    const removedServiceSale = await this.dataSource.removeServiceSale(
      serviceSaleCode
    );

    return removedServiceSale;
  }

  async addProductSale(
    productSale: AddProductSaleParams
  ): Promise<ProductSale | Error> {
    const registeredProductSale = await this.dataSource.addProductSale(
      productSale
    );

    return registeredProductSale;
  }

  async editProductSale(
    productSale: ProductSale
  ): Promise<ProductSale | Error> {
    const editedProductSale = await this.dataSource.editProductSale(
      productSale
    );

    return editedProductSale;
  }
}
