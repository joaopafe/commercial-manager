import { Supplier } from "../entities/Supplier";

export interface SupplierRepository {
  list(): Promise<Supplier[] | null>;
}
