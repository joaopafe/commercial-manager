import { Id, CNPJ, Name, Phone, Supplier } from "../entities/Supplier";

export interface AddSupplierParams {
  cnpj: string;
  name: string;
  phone: string;
}

export interface SupplierRepository {
  getAllSuppliers(): Promise<Supplier[] | null>;
  getSupplierById(id: Id): Promise<Supplier | null>;
  createSupplier(supplier: AddSupplierParams): Promise<Supplier>;
  updateSupplier(supplier: Supplier): Promise<Supplier>;
  removeSupplier(id: Id): Promise<Supplier>;
}
