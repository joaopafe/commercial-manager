// Use cases:
import { GetProductSales } from "../../../domain/useCases/GetProductSales";
import { GetCustomers } from "../../../domain/useCases/GetCustomers";
import { GetParts } from "../../../domain/useCases/GetParts";
import { CreateProductSale } from "../../../domain/useCases/CreateProductSale";
import { EditProductSale } from "../../../domain/useCases/EditProductSale";

// Repositories implementations:
import { SaleRepositoryImpl } from "../../../data/repositories/SaleRepositoryImpl";
import { CustomerRepositoryImpl } from "../../../data/repositories/CustomerRepositoryImpl";
import { PieceRepositoryImpl } from "../../../data/repositories/PieceRepositoryImpl";
import { StockRepositoryImpl } from "../../../data/repositories/StockRepositoryImpl";

// Data sources:
import { SaleDataSource } from "../../../data/repositories/SaleRepositoryImpl";
import { CustomerDataSource } from "../../../data/repositories/CustomerRepositoryImpl";
import { PieceDataSource } from "../../../data/repositories/PieceRepositoryImpl";
import { StockDataSource } from "../../../data/repositories/StockRepositoryImpl";

// Data source implementations:
import { SaleMockDataSource } from "../../../data/dataSources/SaleMockDataSource";
import { CustomerMockDataSource } from "../../../data/dataSources/CustomersMockDataSource";
import { PieceMockDataSource } from "../../../data/dataSources/PieceMockDataSource";
import { StockMockDataSource } from "../../../data/dataSources/StockMockDataSource";

// View model:
import { ProductSalesViewModel } from "../../../presentation/viewModels/ProductSalesViewModel";

export class ProductSalesViewModelFactory {
  private _saleDataSource: SaleDataSource;
  private _customerDataSource: CustomerDataSource;
  private _pieceDataSource: PieceDataSource;
  private _stockDataSource: StockDataSource;

  private _saleRepository: SaleRepositoryImpl;
  private _customerRepository: CustomerRepositoryImpl;
  private _pieceRepository: PieceRepositoryImpl;
  private _stockRepository: StockRepositoryImpl;

  constructor() {
    this._saleDataSource = new SaleMockDataSource();
    this._customerDataSource = new CustomerMockDataSource();
    this._pieceDataSource = new PieceMockDataSource();
    this._stockDataSource = new StockMockDataSource();

    this._saleRepository = new SaleRepositoryImpl(this._saleDataSource);
    this._customerRepository = new CustomerRepositoryImpl(
      this._customerDataSource
    );
    this._pieceRepository = new PieceRepositoryImpl(this._pieceDataSource);
    this._stockRepository = new StockRepositoryImpl(this._stockDataSource);
  }

  makeProductSalesViewModel() {
    const getProductSales = new GetProductSales(this._saleRepository);
    const getCustomers = new GetCustomers(this._customerRepository);
    const getParts = new GetParts(this._pieceRepository);
    const createProductSale = new CreateProductSale(
      this._saleRepository,
      this._customerRepository,
      this._pieceRepository,
      this._stockRepository
    );
    const editProductSale = new EditProductSale(
      this._saleRepository,
      this._customerRepository,
      this._pieceRepository,
      this._stockRepository
    );

    return new ProductSalesViewModel(
      getProductSales,
      getCustomers,
      getParts,
      createProductSale,
      editProductSale
    );
  }
}
