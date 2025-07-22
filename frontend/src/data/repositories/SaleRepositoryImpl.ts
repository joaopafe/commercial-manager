import { ServiceSale } from "../../domain/entities/ServiceSale";
import { ProductSale } from "../../domain/entities/ProductSale";

import { SaleRepository } from "../../domain/repositories/SaleRepository";

export interface SaleDataSource {
  listServiceSales(): Promise<ServiceSale[] | null>;
  listProductSales(): Promise<ProductSale[] | null>;
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
}
