import {
  SupplierId,
  Name,
  Value,
  PurchaseDate,
  ServicePurchase,
} from "../../domain/entities/ServicePurchase";
import { Id } from "../../domain/entities/shared/Id";

import {
  ServicePurchaseRepository,
  ParamsForServicePurchaseCreation,
} from "../../domain/repositories/ServicePurchaseRepository";

export interface ServicePurchaseData {
  id: number;
  supplierId: number;
  name: string;
  value: number;
  date: Date;
}

export interface ServicePurchaseDataSource {
  createTable(): Promise<boolean>;
  findAll(): Promise<ServicePurchaseData[]>;
  findById(id: number): Promise<ServicePurchaseData>;
  create(
    servicePurchase: Omit<ServicePurchaseData, "id">
  ): Promise<ServicePurchaseData>;
  update(servicePurchase: ServicePurchaseData): Promise<ServicePurchaseData>;
  remove(id: number): Promise<ServicePurchaseData>;
}

export class ServicePurchaseRepositoryImpl
  implements ServicePurchaseRepository
{
  constructor(private servicePurchaseDataSource: ServicePurchaseDataSource) {}

  async getAllServicePurchases(): Promise<ServicePurchase[] | null> {
    const servicePurchases = await this.servicePurchaseDataSource.findAll();

    const mappedServicePurchases = servicePurchases.map((servicePurchase) => {
      const id = new Id(servicePurchase.id);
      const supplierId = new SupplierId(servicePurchase.id);
      const name = new Name(servicePurchase.name);
      const value = new Value(servicePurchase.value);
      const date = new PurchaseDate(servicePurchase.date);

      return new ServicePurchase(id, supplierId, name, value, date);
    });

    return mappedServicePurchases;
  }

  async getServicePurchaseById(id: Id): Promise<ServicePurchase | null> {
    const servicePurchase = await this.servicePurchaseDataSource.findById(
      id.id
    );

    const servicePurchaseId = new Id(servicePurchase.id);
    const supplierId = new SupplierId(servicePurchase.id);
    const name = new Name(servicePurchase.name);
    const value = new Value(servicePurchase.value);
    const date = new PurchaseDate(servicePurchase.date);

    return new ServicePurchase(
      servicePurchaseId,
      supplierId,
      name,
      value,
      date
    );
  }

  async createServicePurchase(
    servicePurchase: ParamsForServicePurchaseCreation
  ): Promise<ServicePurchase> {
    const createdServicePurchase = await this.servicePurchaseDataSource.create({
      supplierId: servicePurchase.supplierId.supplierId,
      name: servicePurchase.name.name,
      value: servicePurchase.value.value,
      date: servicePurchase.date.date,
    });

    const id = new Id(createdServicePurchase.id);
    const supplierId = new SupplierId(createdServicePurchase.id);
    const name = new Name(createdServicePurchase.name);
    const value = new Value(createdServicePurchase.value);
    const date = new PurchaseDate(createdServicePurchase.date);

    return new ServicePurchase(id, supplierId, name, value, date);
  }

  async updateServicePurchase(
    servicePurchase: ServicePurchase
  ): Promise<ServicePurchase> {
    const updatedServicePurchase = await this.servicePurchaseDataSource.update({
      id: servicePurchase.id,
      supplierId: servicePurchase.supplierId,
      name: servicePurchase.name,
      value: servicePurchase.value,
      date: servicePurchase.date,
    });

    const id = new Id(updatedServicePurchase.id);
    const supplierId = new SupplierId(updatedServicePurchase.id);
    const name = new Name(updatedServicePurchase.name);
    const value = new Value(updatedServicePurchase.value);
    const date = new PurchaseDate(updatedServicePurchase.date);

    return new ServicePurchase(id, supplierId, name, value, date);
  }

  async removeServicePurchase(id: Id): Promise<ServicePurchase> {
    const removedServicePurchase = await this.servicePurchaseDataSource.remove(
      id.id
    );

    const servicePurchaseId = new Id(removedServicePurchase.id);
    const supplierId = new SupplierId(removedServicePurchase.id);
    const name = new Name(removedServicePurchase.name);
    const value = new Value(removedServicePurchase.value);
    const date = new PurchaseDate(removedServicePurchase.date);

    return new ServicePurchase(
      servicePurchaseId,
      supplierId,
      name,
      value,
      date
    );
  }
}
