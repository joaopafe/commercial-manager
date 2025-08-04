import { ProductPurchase } from "../entities/ProductPurchase";

import { PurchaseRepository } from "../repositories/PurchaseRepository";
import { SupplierRepository } from "../repositories/SupplierRepository";
import { PieceRepository } from "../repositories/PieceRepository";

import { isValidProductPurchase as validProductPurchase } from "../validators/isValidProductPurchase";
import { supplierAlreadyExists } from "../validators/supplierAlreadyExists";
import { pieceAlreadyExists } from "../validators/pieceAlreadyExists";
import { productPurchaseAlreadyExists } from "../validators/productPurchaseAlreadyExists";

export class EditProductPurchase {
  constructor(
    private purchaseRepository: PurchaseRepository,
    private supplierRepository: SupplierRepository,
    private pieceRepository: PieceRepository
  ) {}

  async exec(
    productPurchase: ProductPurchase
  ): Promise<ProductPurchase | Error> {
    const isValidProductPurchase = validProductPurchase(productPurchase);
    if (!isValidProductPurchase)
      return Error("The product purchase is invalid");

    const productPurchases =
      await this.purchaseRepository.listProductPurchases();
    const suppliers = await this.supplierRepository.list();
    const parts = await this.pieceRepository.listPieces();

    if (productPurchases && suppliers && parts) {
      const productPurchaseExists = productPurchaseAlreadyExists(
        productPurchase.id,
        productPurchases
      );
      const supplierExists = supplierAlreadyExists(
        productPurchase.supplierId,
        suppliers
      );
      const pieceExists = pieceAlreadyExists(productPurchase.pieceId, parts);

      if (productPurchaseExists && supplierExists && pieceExists) {
        const editedProductPurchase =
          await this.purchaseRepository.editProductPurchase(productPurchase);

        return editedProductPurchase;
      }

      if (!productPurchaseExists)
        return Error("The product purchase code is invalid");
      if (!supplierExists) return Error("The supplier code is invalid");
      if (!pieceExists) return Error("The piece code is invalid");
    }

    if (!productPurchases)
      return Error("It was not possible to get the product purchases");
    if (!suppliers) return Error("It was not possible to get the suppliers");
    if (!parts) return Error("It was not possible to get the parts");

    return Error("It was not possible to edit the product purchase");
  }
}
