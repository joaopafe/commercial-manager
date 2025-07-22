import { ProductSale } from "../entities/ProductSale";
import { Customer } from "../entities/Customer";
import { Piece } from "../entities/Piece";
import { GeneralSale } from "../entities/GeneralSale";

export const productSaleMapper = (
  productSales: ProductSale[],
  customers: Customer[],
  parts: Piece[]
): GeneralSale[] => {
  const mappedProductSales = productSales.map((productSale) => {
    const customer = customers.find((customer) => {
      return customer.code === productSale.clientId;
    });

    const piece = parts.find((piece) => {
      return piece.code === productSale.pieceId;
    });

    return {
      clientName: customer ? customer.name : "",
      name: piece ? `${productSale.quantity}X ${piece.name}` : "",
      value: productSale.value,
      date: productSale.date,
    };
  });

  return mappedProductSales;
};
