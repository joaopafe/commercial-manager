import { PurchaseRepository } from "../repositories/PurchaseRepository";
import { SupplierRepository } from "../repositories/SupplierRepository";
import { PieceRepository } from "../repositories/PieceRepository";

import { servicePurchaseMapper } from "../mappers/servicePurchaseMapper";
import { productPurchaseMapper } from "../mappers/productPurchaseMapper";
import { purchasesAggregator } from "../aggregators/purchasesAggregator";

export class GetAllPurchases {
  constructor(
    private purchaseRepository: PurchaseRepository,
    private supplierRepository: SupplierRepository,
    private pieceRepository: PieceRepository
  ) {}

  async exec() {
    const servicePurchases =
      await this.purchaseRepository.listServicePurchases();
    const productPurchases =
      await this.purchaseRepository.listProductPurchases();
    const suppliers = await this.supplierRepository.list();
    const parts = await this.pieceRepository.listPieces();

    if (servicePurchases && productPurchases && suppliers && parts) {
      const mappedServicePurchases = servicePurchaseMapper(
        servicePurchases,
        suppliers
      );
      const mappedProductPurchases = productPurchaseMapper(
        productPurchases,
        suppliers,
        parts
      );

      const allPurchases = purchasesAggregator(
        mappedServicePurchases,
        mappedProductPurchases
      );

      return allPurchases;
    }

    if (servicePurchases === null)
      return Error("It was not possible to get the service purchases");
    if (productPurchases === null)
      return Error("It was not possible to get the product purchases");
    if (suppliers === null)
      return Error("It was not possible to get the suppliers");
    return Error("It was not possible to get the parts");
  }
}
