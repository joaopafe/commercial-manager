import { ServicePurchase } from "../entities/ServicePurchase";

import { PurchaseRepository } from "../repositories/PurchaseRepository";
import { SupplierRepository } from "../repositories/SupplierRepository";

import { isValidServicePurchase as validServicePurchase } from "../validators/isValidServicePurchase";
import { supplierAlreadyExists } from "../validators/supplierAlreadyExists";

export interface AddServicePurchaseParams {
  supplierId: number;
  name: string;
  value: number;
  date: Date;
}

export class CreateServicePurchase {
  constructor(
    private purchaseRepository: PurchaseRepository,
    private supplierRepository: SupplierRepository
  ) {}

  async exec(
    servicePurchase: AddServicePurchaseParams
  ): Promise<ServicePurchase | Error> {
    const isValidServicePurchase = validServicePurchase(servicePurchase);
    if (!isValidServicePurchase)
      return Error("The service purchase is invalid");

    const suppliers = await this.supplierRepository.list();

    if (suppliers) {
      const supplierExists = supplierAlreadyExists(
        servicePurchase.supplierId,
        suppliers
      );

      if (supplierExists) {
        const registeredServicePurchase =
          await this.purchaseRepository.addServicePurchase(servicePurchase);

        return registeredServicePurchase;
      }

      if (!supplierExists) return Error("The supplier code is invalid");
    }

    if (suppliers === null)
      return Error("It was not possible to get the suppliers");

    return Error("It was not possible to create the service purchase");
  }
}
