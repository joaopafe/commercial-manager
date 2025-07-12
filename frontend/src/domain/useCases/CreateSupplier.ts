import { Supplier } from "../entities/Supplier";

import { SupplierRepository } from "../repositories/SupplierRepository";

import { isValidCNPJ as validCNPJ } from "../validators/isValidCNPJ";
import { isValidPhone as validPhone } from "../validators/isValidPhone";

export interface AddSupplierParams {
  cnpj: string;
  name: string;
  phone: string;
}

export class CreateSupplier {
  constructor(private supplierRepository: SupplierRepository) {}

  async exec(supplier: AddSupplierParams): Promise<Supplier | Error> {
    const isValidCNPJ = validCNPJ(supplier.cnpj);
    const isValidPhone = validPhone(supplier.phone);
    const isValidName = supplier.name.length >= 2;

    const isValidSupplier = isValidCNPJ && isValidPhone && isValidName;

    if (isValidSupplier) {
      const createdSupplier = await this.supplierRepository.create(supplier);

      return createdSupplier;
    }

    if (!isValidSupplier) {
      if (!isValidCNPJ) {
        return Error("The supplier cnpj is invalid");
      }

      if (!isValidPhone) {
        return Error("The supplier phone is invalid");
      }

      if (!isValidName) {
        return Error("The supplier name is invalid");
      }
    }

    return Error("It was not possible to create supplier");
  }
}
