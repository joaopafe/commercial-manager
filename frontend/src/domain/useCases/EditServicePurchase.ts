import { ServicePurchase } from "../entities/ServicePurchase";

import { PurchaseRepository } from "../repositories/PurchaseRepository";
import { SupplierRepository } from "../repositories/SupplierRepository";

import { isValidServicePurchase as validServicePurchase } from "../validators/isValidServicePurchase";
import { servicePurchaseAlreadyExists } from "../validators/servicePurchaseAlreadtExists";
import { supplierAlreadyExists } from "../validators/supplierAlreadyExists";

export class EditServicePurchase {
  constructor(
    private purchaseRepository: PurchaseRepository,
    private supplierRepository: SupplierRepository
  ) {}

  async exec(servicePurchase: ServicePurchase) {
    const isValidServicePurchase = validServicePurchase(servicePurchase);
    if (!isValidServicePurchase)
      return Error("The service purchase is invalid");

    const suppliers = await this.supplierRepository.list();
    const servicePurchases =
      await this.purchaseRepository.listServicePurchases();

    if (suppliers && servicePurchases) {
      const supplierExists = supplierAlreadyExists(
        servicePurchase.supplierId,
        suppliers
      );
      const servicePurchaseExists = servicePurchaseAlreadyExists(
        servicePurchase.id,
        servicePurchases
      );

      if (supplierExists && servicePurchaseExists) {
        const editedServicePurchase =
          await this.purchaseRepository.editServicePurchase(servicePurchase);

        return editedServicePurchase;
      }

      return !supplierExists
        ? Error("The supplier code is invalid")
        : Error("The service purchase code is invalid");
    }

    return suppliers === null
      ? Error("It was not possible to get the suppliers")
      : servicePurchases === null
      ? Error("It was not possible to get the service purchases")
      : Error("It was not possible to create the service purchase");
  }
}
