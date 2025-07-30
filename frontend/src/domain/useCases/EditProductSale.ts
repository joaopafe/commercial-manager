import { ProductSale } from "../entities/ProductSale";

import { SaleRepository } from "../repositories/SaleRepository";
import { CustomerRepository } from "../repositories/CustomerRepository";
import { PieceRepository } from "../repositories/PieceRepository";
import { StockRepository } from "../repositories/StockRepository";

import { isValidProductSale as validProductSale } from "../validators/isValidProductSale";
import { customerAlreadyExists } from "../validators/customerAlreadyExists";
import { pieceAlreadyExists } from "../validators/pieceAlreadyExists";
import { productSaleAlreadyExists } from "../validators/productSaleAlreadyExists";
import { thereIsStockAvailable as hasStock } from "../validators/thereIsStockAvailable";

export class EditProductSale {
  constructor(
    private saleRepository: SaleRepository,
    private customerRepository: CustomerRepository,
    private pieceRepository: PieceRepository,
    private stockRepository: StockRepository
  ) {}

  async exec(productSale: ProductSale): Promise<ProductSale | Error> {
    const isValidProductSale = validProductSale(productSale);
    if (!isValidProductSale) return Error("The product sale is invalid");

    const productSales = await this.saleRepository.listProductSales();
    const customers = await this.customerRepository.list();
    const parts = await this.pieceRepository.listPieces();

    if (productSales && customers && parts) {
      const productSaleExists = productSaleAlreadyExists(
        productSale.id,
        productSales
      );
      const customerExists = customerAlreadyExists(
        productSale.clientId,
        customers
      );
      const pieceExists = pieceAlreadyExists(productSale.pieceId, parts);

      if (productSaleExists && customerExists && pieceExists) {
        const stockGroups = await this.stockRepository.list();

        if (stockGroups) {
          const thereIsStockAvailable = hasStock(
            productSale.pieceId,
            productSale.quantity,
            stockGroups
          );

          if (thereIsStockAvailable) {
            const editedProductSale = await this.saleRepository.editProductSale(
              productSale
            );

            return editedProductSale;
          }

          return Error("Quantity is unavailable for sale");
        }

        if (!stockGroups === null)
          return Error("It was not possible to get the stock");
      }

      if (!productSaleExists) return Error("The product sale code is invalid");
      if (!customerExists) return Error("The customer code is invalid");
      if (!pieceExists) return Error("The piece code is invalid");
    }

    if (!productSales)
      return Error("It was not possible to get the product sales");
    if (!customers) return Error("It was not possible to get the customers");
    if (!parts) return Error("It was not possible to get the parts");

    return Error("It was not possible to edit the product sale");
  }
}
