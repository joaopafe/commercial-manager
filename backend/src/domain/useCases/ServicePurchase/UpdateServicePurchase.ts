import { ServicePurchaseRepository } from "../../repositories/ServicePurchaseRepository";
import { SupplierRepository } from "../../repositories/SupplierRepository";

import {
  SupplierId,
  Name,
  Value,
  PurchaseDate,
  ServicePurchase,
} from "../../entities/ServicePurchase";
import { Id } from "../../entities/shared/Id";

import { ServicePurchaseError } from "../../entities/errors/ServicePurchaseError";

import { AddServicePurchaseParams } from "./AddServicePurchase";

export interface UpdateServicePurchaseParams extends AddServicePurchaseParams {
  id: number;
}

export class UpdateServicePurchase {
  constructor(
    private servicePurchaseRepository: ServicePurchaseRepository,
    private supplierRepository: SupplierRepository
  ) {}

  async exec(servicePurchase: UpdateServicePurchaseParams) {
    const servicePurchaseExists =
      await this.servicePurchaseRepository.getServicePurchaseById(
        new Id(servicePurchase.id)
      );
    if (!servicePurchaseExists)
      throw new ServicePurchaseError(
        "service_purchase_not_found",
        "Service purchase id does not exist"
      );
    const id = new Id(servicePurchase.id);

    const supplierExists = await this.supplierRepository.getSupplierById(
      new Id(servicePurchase.supplierId)
    );
    if (!supplierExists)
      throw new ServicePurchaseError(
        "supplier_id_is_invalid",
        "The supplier id does not exist"
      );
    const supplierId = new SupplierId(servicePurchase.supplierId);

    const name = new Name(servicePurchase.name);
    const value = new Value(servicePurchase.value);
    const date = new PurchaseDate(servicePurchase.date);

    return await this.servicePurchaseRepository.updateServicePurchase(
      new ServicePurchase(id, supplierId, name, value, date)
    );
  }
}
