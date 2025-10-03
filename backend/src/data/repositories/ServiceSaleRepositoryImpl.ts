import {
  CustomerId,
  Name,
  Value,
  SaleDate,
  ServiceSale,
} from "../../domain/entities/ServiceSale";
import { Id } from "../../domain/entities/shared/Id";

import {
  ServiceSaleRepository,
  ParamsForServiceSaleCreation,
} from "../../domain/repositories/ServiceSaleRepository";

export interface ServiceSaleData {
  id: number;
  customerId: number;
  name: string;
  value: number;
  date: Date;
}

export interface ServiceSaleDataSource {
  createTable(): Promise<boolean>;
  findAll(): Promise<ServiceSaleData[]>;
  findById(id: number): Promise<ServiceSaleData>;
  create(serviceSale: Omit<ServiceSaleData, "id">): Promise<ServiceSaleData>;
  update(serviceSale: ServiceSaleData): Promise<ServiceSaleData>;
  remove(id: number): Promise<ServiceSaleData>;
}

export class ServiceSaleRepositoryImpl implements ServiceSaleRepository {
  constructor(private serviceSaleDataSource: ServiceSaleDataSource) {}

  async getAllServiceSales(): Promise<ServiceSale[] | null> {
    const serviceSales = await this.serviceSaleDataSource.findAll();

    const mappedServiceSales = serviceSales.map((serviceSale) => {
      const id = new Id(serviceSale.id);
      const customerId = new CustomerId(serviceSale.customerId);
      const name = new Name(serviceSale.name);
      const value = new Value(serviceSale.value);
      const date = new SaleDate(serviceSale.date);

      return new ServiceSale(id, customerId, name, value, date);
    });

    return mappedServiceSales;
  }

  async getServiceSaleById(id: Id): Promise<ServiceSale | null> {
    const serviceSale = await this.serviceSaleDataSource.findById(id.id);

    const serviceSaleId = new Id(serviceSale.id);
    const customerId = new CustomerId(serviceSale.customerId);
    const name = new Name(serviceSale.name);
    const value = new Value(serviceSale.value);
    const date = new SaleDate(serviceSale.date);

    return new ServiceSale(serviceSaleId, customerId, name, value, date);
  }

  async createServiceSale(
    serviceSale: ParamsForServiceSaleCreation
  ): Promise<ServiceSale> {
    const createdServiceSale = await this.serviceSaleDataSource.create({
      customerId: serviceSale.customerId.customerId,
      name: serviceSale.name.name,
      value: serviceSale.value.value,
      date: serviceSale.date.date,
    });

    const id = new Id(createdServiceSale.id);
    const customerId = new CustomerId(createdServiceSale.customerId);
    const name = new Name(createdServiceSale.name);
    const value = new Value(createdServiceSale.value);
    const date = new SaleDate(createdServiceSale.date);

    return new ServiceSale(id, customerId, name, value, date);
  }

  async updateServiceSale(serviceSale: ServiceSale): Promise<ServiceSale> {
    const updatedServiceSale = await this.serviceSaleDataSource.update({
      id: serviceSale.id,
      customerId: serviceSale.customerId,
      name: serviceSale.name,
      value: serviceSale.value,
      date: serviceSale.date,
    });

    const id = new Id(updatedServiceSale.id);
    const customerId = new CustomerId(updatedServiceSale.customerId);
    const name = new Name(updatedServiceSale.name);
    const value = new Value(updatedServiceSale.value);
    const date = new SaleDate(updatedServiceSale.date);

    return new ServiceSale(id, customerId, name, value, date);
  }

  async removeServiceSale(id: Id): Promise<ServiceSale> {
    const removedServiceSale = await this.serviceSaleDataSource.remove(id.id);

    const serviceSaleId = new Id(removedServiceSale.customerId);
    const customerId = new CustomerId(removedServiceSale.customerId);
    const name = new Name(removedServiceSale.name);
    const value = new Value(removedServiceSale.value);
    const date = new SaleDate(removedServiceSale.date);

    return new ServiceSale(serviceSaleId, customerId, name, value, date);
  }
}
