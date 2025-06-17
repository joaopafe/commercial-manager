import { SupplierRepository } from "../repositories/SupplierRepository";

export class GetSuppliers {
  constructor(private supplierRepository: SupplierRepository) {}

  async exec() {
    const suppliers = await this.supplierRepository.list();

    return suppliers;
  }
}
