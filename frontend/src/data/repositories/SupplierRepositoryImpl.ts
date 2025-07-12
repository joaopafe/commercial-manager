import { Supplier } from "../../domain/entities/Supplier";

import { SupplierRepository } from "../../domain/repositories/SupplierRepository";

import { AddSupplierParams } from "../../domain/useCases/CreateSupplier";

export interface SupplierDataSource {
  list(): Promise<Supplier[] | null>;
  add(supplier: AddSupplierParams): Promise<Supplier | Error>;
}

export class SupplierRepositoryImpl implements SupplierRepository {
  constructor(private dataSource: SupplierDataSource) {}

  async list(): Promise<Supplier[] | null> {
    const suppilers = await this.dataSource.list();

    return suppilers;
  }

  async create(supplier: AddSupplierParams): Promise<Supplier | Error> {
    const createdSupplier = await this.dataSource.add(supplier);

    return createdSupplier;
  }
}
