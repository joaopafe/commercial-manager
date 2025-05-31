import { Supplier } from "../entities/Supplier";

export interface SupplierDataSource {
  list(): Promise<Supplier[] | null>;
}

export class SupplierRepository {
  constructor(private mock: SupplierDataSource) {}

  async list(): Promise<Supplier[] | null> {
    const suppilers = await this.mock.list();

    if (suppilers === null) return null;

    return suppilers;
  }
}
