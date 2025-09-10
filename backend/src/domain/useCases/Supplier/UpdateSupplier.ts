import { SupplierRepository } from "../../repositories/SupplierRepository";

import { CNPJ, Name, Phone, Supplier } from "../../entities/Supplier";
import { Id } from "../../entities/shared/Id";

import { SupplierError } from "../../entities/errors/SupplierError";

import { AddSupplierParams } from "./AddSupplier";

export interface UpdateSupplierParams extends AddSupplierParams {
  id: number;
}

export class UpdateSupplier {
  constructor(private supplierRepository: SupplierRepository) {}

  async exec(supplier: UpdateSupplierParams) {
    const supplierExists = await this.supplierRepository.getSupplierById(
      new Id(supplier.id)
    );
    if (!supplierExists)
      throw new SupplierError(
        "supplier_not_found",
        "The supplier id does not exist"
      );
    const id = new Id(supplier.id);

    const cnpj = new CNPJ(supplier.cnpj);

    const name = new Name(supplier.name);

    const phone = new Phone(supplier.phone);

    return await this.supplierRepository.updateSupplier(
      new Supplier(id, cnpj, name, phone)
    );
  }
}
