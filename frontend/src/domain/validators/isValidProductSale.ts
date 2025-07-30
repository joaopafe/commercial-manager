import { AddProductSaleParams } from "../useCases/CreateProductSale";

export const isValidProductSale = (productSale: AddProductSaleParams) => {
  const isValidProductSale =
    productSale.clientId >= 1 &&
    productSale.pieceId >= 1 &&
    productSale.quantity >= 1 &&
    productSale.value >= 0;

  return isValidProductSale;
};
