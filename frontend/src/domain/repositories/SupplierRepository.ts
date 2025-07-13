import { Supplier } from "../entities/Supplier";

import { AddSupplierParams } from "../useCases/CreateSupplier";

export interface SupplierRepository {
  list(): Promise<Supplier[] | null>;
  create(supplier: AddSupplierParams): Promise<Supplier | Error>;
  edit(supplier: Supplier): Promise<Supplier | Error>;
  remove(supplierCode: number): Promise<Supplier | Error>;
}
