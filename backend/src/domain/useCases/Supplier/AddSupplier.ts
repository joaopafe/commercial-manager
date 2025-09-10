import { SupplierRepository } from "../../repositories/SupplierRepository";

import { CNPJ, Name, Phone, Supplier } from "../../entities/Supplier";
import { Id } from "../../entities/shared/Id";

export interface AddSupplierParams {
  cnpj: string;
  name: string;
  phone: string;
}

export class AddSupplier {
  constructor(private supplierRepository: SupplierRepository) {}

  async exec(supplier: AddSupplierParams) {
    const cnpj = new CNPJ(supplier.cnpj);
    const name = new Name(supplier.name);
    const phone = new Phone(supplier.phone);

    const createdSupplier = await this.supplierRepository.createSupplier({
      cnpj,
      name,
      phone,
    });

    return createdSupplier;
  }
}
