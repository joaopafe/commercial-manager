import { Supplier } from "../../domain/entities/Supplier";

import { SupplierRepository } from "../../domain/repositories/SupplierRepository";

export interface SupplierDataSource {
  list(): Promise<Supplier[] | null>;
}

export class SupplierRepositoryImpl implements SupplierRepository {
  constructor(private dataSource: SupplierDataSource) {}

  async list(): Promise<Supplier[] | null> {
    const suppilers = await this.dataSource.list();

    return suppilers;
  }
}
