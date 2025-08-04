import { AddProductPurchaseParams } from "../useCases/CreateProductPurchase";

export const isValidProductPurchase = (
  productPurchase: AddProductPurchaseParams
) => {
  const isValidProductPurchase =
    productPurchase.supplierId >= 1 &&
    productPurchase.pieceId >= 1 &&
    productPurchase.quantity >= 1 &&
    productPurchase.value >= 0;

  return isValidProductPurchase;
};
