import { ProductPurchase } from "../entities/ProductPurchase";
import { Supplier } from "../entities/Supplier";
import { Piece } from "../entities/Piece";
import { GeneralPurchase } from "../entities/GeneralPurchase";

export const productPurchaseMapper = (
  productPurchases: ProductPurchase[],
  suppliers: Supplier[],
  parts: Piece[]
): GeneralPurchase[] => {
  const mappedProductPurchases = productPurchases.map((productPurchase) => {
    const piece = parts.find((piece) => {
      return piece.code === productPurchase.pieceId;
    });

    const supplier = suppliers.find((supplier) => {
      return supplier.code === piece?.supplierCode;
    });

    return {
      supplierName: supplier ? supplier.name : "",
      name: piece ? `${productPurchase.quantity}X ${piece.name}` : "",
      value: productPurchase.value,
      date: productPurchase.date,
    };
  });

  return mappedProductPurchases;
};
