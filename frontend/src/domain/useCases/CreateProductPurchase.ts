import { ProductPurchase } from "../entities/ProductPurchase";

import { PurchaseRepository } from "../repositories/PurchaseRepository";
import { SupplierRepository } from "../repositories/SupplierRepository";
import { PieceRepository } from "../repositories/PieceRepository";

import { isValidProductPurchase as validProductPurchase } from "../validators/isValidProductPurchase";
import { supplierAlreadyExists } from "../validators/supplierAlreadyExists";
import { pieceAlreadyExists } from "../validators/pieceAlreadyExists";

export interface AddProductPurchaseParams {
  supplierId: number;
  pieceId: number;
  quantity: number;
  value: number;
  date: Date;
}

export class CreateProductPurchase {
  constructor(
    private purchaseRepository: PurchaseRepository,
    private supplierRepository: SupplierRepository,
    private pieceRepository: PieceRepository
  ) {}

  async exec(
    productPurchase: AddProductPurchaseParams
  ): Promise<ProductPurchase | Error> {
    const isValidProductPurchase = validProductPurchase(productPurchase);
    if (!isValidProductPurchase)
      return Error("The product purchase is invalid");

    const suppliers = await this.supplierRepository.list();
    const parts = await this.pieceRepository.listPieces();

    if (suppliers && parts) {
      const supplierExists = supplierAlreadyExists(
        productPurchase.supplierId,
        suppliers
      );
      const pieceExists = pieceAlreadyExists(productPurchase.pieceId, parts);

      if (supplierExists && pieceExists) {
        const createdProductPurchase =
          await this.purchaseRepository.addProductPurchase(productPurchase);

        return createdProductPurchase;
      }

      if (!supplierExists) return Error("The supplier code is invalid");
      if (!pieceExists) return Error("The piece code is invalid");
    }

    if (suppliers === null)
      return Error("It was not possible to get the suppliers");
    if (parts === null) return Error("It was not possible to get the parts");

    return Error("It was not possible to create the product purchase");
  }
}
