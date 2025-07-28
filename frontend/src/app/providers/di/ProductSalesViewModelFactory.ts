// Use cases:
import { GetProductSales } from "../../../domain/useCases/GetProductSales";
import { GetCustomers } from "../../../domain/useCases/GetCustomers";
import { GetParts } from "../../../domain/useCases/GetParts";

// Repositories implementations:
import { SaleRepositoryImpl } from "../../../data/repositories/SaleRepositoryImpl";
import { CustomerRepositoryImpl } from "../../../data/repositories/CustomerRepositoryImpl";
import { PieceRepositoryImpl } from "../../../data/repositories/PieceRepositoryImpl";

// Data sources:
import { SaleDataSource } from "../../../data/repositories/SaleRepositoryImpl";
import { CustomerDataSource } from "../../../data/repositories/CustomerRepositoryImpl";
import { PieceDataSource } from "../../../data/repositories/PieceRepositoryImpl";

// Data source implementations:
import { SaleMockDataSource } from "../../../data/dataSources/SaleMockDataSource";
import { CustomerMockDataSource } from "../../../data/dataSources/CustomersMockDataSource";
import { PieceMockDataSource } from "../../../data/dataSources/PieceMockDataSource";

// View model:
import { ProductSalesViewModel } from "../../../presentation/viewModels/ProductSalesViewModel";

export class ProductSalesViewModelFactory {
  private _saleDataSource: SaleDataSource;
  private _customerDataSource: CustomerDataSource;
  private _pieceDataSource: PieceDataSource;

  private _saleRepository: SaleRepositoryImpl;
  private _customerRepository: CustomerRepositoryImpl;
  private _pieceRepository: PieceRepositoryImpl;

  constructor() {
    this._saleDataSource = new SaleMockDataSource();
    this._customerDataSource = new CustomerMockDataSource();
    this._pieceDataSource = new PieceMockDataSource();

    this._saleRepository = new SaleRepositoryImpl(this._saleDataSource);
    this._customerRepository = new CustomerRepositoryImpl(
      this._customerDataSource
    );
    this._pieceRepository = new PieceRepositoryImpl(this._pieceDataSource);
  }

  makeProductSalesViewModel() {
    const getProductSales = new GetProductSales(this._saleRepository);
    const getCustomers = new GetCustomers(this._customerRepository);
    const getParts = new GetParts(this._pieceRepository);

    return new ProductSalesViewModel(getProductSales, getCustomers, getParts);
  }
}
