import { ServicePurchaseRepository } from "../../repositories/ServicePurchaseRepository";
import { SupplierRepository } from "../../repositories/SupplierRepository";

import {
  SupplierId,
  Name,
  Value,
  PurchaseDate,
} from "../../entities/ServicePurchase";
import { Id } from "../../entities/shared/Id";

import { ServicePurchaseError } from "../../entities/errors/ServicePurchaseError";

export interface AddServicePurchaseParams {
  supplierId: number;
  name: string;
  value: number;
  date: Date;
}

export class AddServicePurchase {
  constructor(
    private servicePurchaseRepository: ServicePurchaseRepository,
    private supplierRepository: SupplierRepository
  ) {}

  async exec(servicePurchase: AddServicePurchaseParams) {
    const supplierIdExists = await this.supplierRepository.getSupplierById(
      new Id(servicePurchase.supplierId)
    );
    if (!supplierIdExists)
      throw new ServicePurchaseError(
        "supplier_id_is_invalid",
        "The supplier id does not exist"
      );
    const supplierId = new SupplierId(servicePurchase.supplierId);

    const name = new Name(servicePurchase.name);
    const value = new Value(servicePurchase.value);
    const date = new PurchaseDate(servicePurchase.date);

    return await this.servicePurchaseRepository.createServicePurchase({
      supplierId,
      name,
      value,
      date,
    });
  }
}
