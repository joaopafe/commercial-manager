import { Supplier } from "../entities/Supplier";

import { SupplierRepository } from "../repositories/SupplierRepository";

import { isValidCNPJ as validCNPJ } from "../validators/isValidCNPJ";
import { isValidPhone as validPhone } from "../validators/isValidPhone";
import { supplierAlreadyExists } from "../validators/supplierAlreadyExists";

export class EditSupplier {
  constructor(private supplierRepository: SupplierRepository) {}

  async exec(supplier: Supplier): Promise<Supplier | Error> {
    const isValidCNPJ = validCNPJ(supplier.cnpj);
    const isValidPhone = validPhone(supplier.phone);
    const isValidName = supplier.name.length >= 2;

    const isValidSupplier = isValidCNPJ && isValidPhone && isValidName;

    if (isValidSupplier) {
      const suppliers = await this.supplierRepository.list();

      if (suppliers) {
        const supplierExists = supplierAlreadyExists(supplier.code, suppliers);

        if (supplierExists) {
          const editedSupplier = await this.supplierRepository.edit(supplier);

          return editedSupplier;
        }

        return Error("The supplier code is invalid");
      }

      return Error("It was not possible to edit supplier");
    }

    if (!isValidSupplier) {
      if (!isValidCNPJ) {
        return Error("The supplier CNPJ is invalid");
      }
      if (!isValidPhone) {
        return Error("The supplier phone is invalid");
      }
      if (!isValidName) {
        return Error("The supplier name is invalid");
      }
    }

    return Error("It was not possible to edit supplier");
  }
}
