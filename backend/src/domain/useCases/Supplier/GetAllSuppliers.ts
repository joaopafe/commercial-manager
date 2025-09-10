import { SupplierRepository } from "../../repositories/SupplierRepository";

import { DomainError } from "../../entities/errors/DomainError";

export class GetAllSuppliers {
  constructor(private supplierRepository: SupplierRepository) {}

  async exec() {
    const suppliers = await this.supplierRepository.getAllSuppliers();

    if (suppliers === null)
      throw new DomainError(
        "unknown",
        "It was not possible to get the suppliers"
      );

    return suppliers;
  }
}
