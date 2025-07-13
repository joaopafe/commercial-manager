import { Supplier } from "../entities/Supplier";

import { SupplierRepository } from "../repositories/SupplierRepository";

import { supplierAlreadyExists } from "../validators/supplierAlreadyExists";

export class RemoveSupplier {
  constructor(private supplierRepository: SupplierRepository) {}

  async exec(supplierCode: number): Promise<Supplier | Error> {
    const suppliers = await this.supplierRepository.list();

    if (suppliers) {
      const supplierExists = supplierAlreadyExists(supplierCode, suppliers);

      if (supplierExists) {
        const removedSupplier = await this.supplierRepository.remove(
          supplierCode
        );

        return removedSupplier;
      }
    }

    return Error("It was not possible to remove the supplier");
  }
}
