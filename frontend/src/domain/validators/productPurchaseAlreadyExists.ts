import { ProductPurchase } from "../entities/ProductPurchase";

export const productPurchaseAlreadyExists = (
  productPurchaseCode: number,
  productPurchases: ProductPurchase[]
) => {
  const productPurchaseAlreadyExists =
    productPurchases.filter((productPurchase) => {
      return productPurchase.id === productPurchaseCode;
    }).length === 1;

  return productPurchaseAlreadyExists;
};
