import { SupplierRepository } from "../../repositories/SupplierRepository";

import { Id } from "../../entities/shared/Id";

import { SupplierError } from "../../entities/errors/SupplierError";

export class RemoveSupplier {
  constructor(private supplierRepository: SupplierRepository) {}

  async exec(id: number) {
    const supplierExists = await this.supplierRepository.getSupplierById(
      new Id(id)
    );
    if (!supplierExists)
      throw new SupplierError(
        "supplier_not_found",
        "The supplier id does not exist"
      );

    return await this.supplierRepository.removeSupplier(new Id(id));
  }
}
