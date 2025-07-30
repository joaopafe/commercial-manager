import { ProductSale } from "../entities/ProductSale";

export const productSaleAlreadyExists = (
  productSaleCode: number,
  productSales: ProductSale[]
) => {
  const productSaleAlreadyExists =
    productSales.filter((productSale) => {
      return productSale.id === productSaleCode;
    }).length === 1;

  return productSaleAlreadyExists;
};
