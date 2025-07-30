import { ProductSale } from "../entities/ProductSale";

import { SaleRepository } from "../repositories/SaleRepository";
import { CustomerRepository } from "../repositories/CustomerRepository";
import { PieceRepository } from "../repositories/PieceRepository";
import { StockRepository } from "../repositories/StockRepository";

import { isValidProductSale as validProductSale } from "../validators/isValidProductSale";
import { customerAlreadyExists } from "../validators/customerAlreadyExists";
import { pieceAlreadyExists } from "../validators/pieceAlreadyExists";
import { thereIsStockAvailable as hasStock } from "../validators/thereIsStockAvailable";

export interface AddProductSaleParams {
  clientId: number;
  pieceId: number;
  quantity: number;
  value: number;
  date: Date;
}

export class CreateProductSale {
  constructor(
    private saleRepository: SaleRepository,
    private customerRepository: CustomerRepository,
    private pieceRepository: PieceRepository,
    private stockRepository: StockRepository
  ) {}

  async exec(productSale: AddProductSaleParams): Promise<ProductSale | Error> {
    const isValidProductSale = validProductSale(productSale);
    if (!isValidProductSale) return Error("The product sale is invalid");

    const customers = await this.customerRepository.list();
    const parts = await this.pieceRepository.listPieces();

    if (customers && parts) {
      const customerExists = customerAlreadyExists(
        productSale.clientId,
        customers
      );
      const pieceExists = pieceAlreadyExists(productSale.pieceId, parts);

      if (customerExists && pieceExists) {
        const stockGroups = await this.stockRepository.list();

        if (stockGroups) {
          const thereIsStockAvailable = hasStock(
            productSale.pieceId,
            productSale.quantity,
            stockGroups
          );

          if (thereIsStockAvailable) {
            const createdProductSale = await this.saleRepository.addProductSale(
              productSale
            );

            return createdProductSale;
          }

          return Error("Quantity is unavailable for sale");
        }

        if (stockGroups === null)
          return Error("It was not possible to get the stock");
      }

      if (!customerExists) return Error("The customer code is invalid");
      if (!pieceExists) return Error("The piece code is invalid");
    }

    if (customers === null)
      return Error("It was not possible to get the customers");
    if (parts === null) return Error("It was not possible to get the parts");

    return Error("It was not possible to create the product sale");
  }
}
