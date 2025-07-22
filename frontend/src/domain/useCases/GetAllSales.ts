import { SaleRepository } from "../repositories/SaleRepository";
import { CustomerRepository } from "../repositories/CustomerRepository";
import { PieceRepository } from "../repositories/PieceRepository";

import { serviceSaleMapper } from "../mappers/serviceSaleMapper";
import { productSaleMapper } from "../mappers/productSaleMapper";
import { salesAggregator } from "../aggregators/SalesAggregator";

export class GetAllSales {
  constructor(
    private saleRepository: SaleRepository,
    private customerRepository: CustomerRepository,
    private pieceRepository: PieceRepository
  ) {}
  async exec() {
    const serviceSales = await this.saleRepository.listServiceSales();
    const productSales = await this.saleRepository.listProductSales();
    const customers = await this.customerRepository.list();
    const parts = await this.pieceRepository.listPieces();

    if (serviceSales && productSales && customers && parts) {
      const mappedServiceSales = serviceSaleMapper(serviceSales, customers);
      const mappedProductSales = productSaleMapper(
        productSales,
        customers,
        parts
      );

      const allSales = salesAggregator(mappedServiceSales, mappedProductSales);

      return allSales;
    }

    if (serviceSales === null)
      return Error("It was not possible to get the service sales");
    if (productSales === null)
      return Error("It was not possible to get the product sales");
    if (customers === null)
      return Error("It was not possible to get the customers");
    return Error("It was not possible to get the x");
  }
}
