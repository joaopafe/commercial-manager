import { CNPJ, Name, Phone, Supplier } from "../entities/Supplier";
import { Id } from "../entities/shared/Id";

export interface ParamsForSupplierCreation {
  cnpj: CNPJ;
  name: Name;
  phone: Phone;
}

export interface SupplierRepository {
  getAllSuppliers(): Promise<Supplier[] | null>;
  getSupplierById(id: Id): Promise<Supplier | null>;
  createSupplier(supplier: ParamsForSupplierCreation): Promise<Supplier>;
  updateSupplier(supplier: Supplier): Promise<Supplier>;
  removeSupplier(id: Id): Promise<Supplier>;
}
