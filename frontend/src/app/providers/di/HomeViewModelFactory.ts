// Use cases:
import { GetTotalInCash } from "../../../domain/useCases/GetTotalInCash";
import { GetAllSales } from "../../../domain/useCases/GetAllSales";
import { GetTodaySales } from "../../../domain/useCases/GetTodaySales";
import { GetLatestSales } from "../../../domain/useCases/GetLatestSales";

// Repositories implementations:
import { SaleRepositoryImpl } from "../../../data/repositories/SaleRepositoryImpl";
import { CustomerRepositoryImpl } from "../../../data/repositories/CustomerRepositoryImpl";
import { PieceRepositoryImpl } from "../../../data/repositories/PieceRepositoryImpl";
import { TotalInCashRepositoryImpl } from "../../../data/repositories/TotalInCashRepositoryImpl";

// Data sources:
import { SaleDataSource } from "../../../data/repositories/SaleRepositoryImpl";
import { CustomerDataSource } from "../../../data/repositories/CustomerRepositoryImpl";
import { PieceDataSource } from "../../../data/repositories/PieceRepositoryImpl";
import { CashDataSource } from "../../../data/repositories/TotalInCashRepositoryImpl";

// Data source implementations:
import { SaleMockDataSource } from "../../../data/dataSources/SaleMockDataSource";
import { CustomerMockDataSource } from "../../../data/dataSources/CustomersMockDataSource";
import { PieceMockDataSource } from "../../../data/dataSources/PieceMockDataSource";
import { CashMockDataSource } from "../../../data/dataSources/CashMockDataSource";

//ViewModel:
import { HomeViewModel } from "../../../presentation/viewModels/HomeViewModel";

export class HomeViewModelFactory {
  private _saleDataSource: SaleDataSource;
  private _customerDataSource: CustomerDataSource;
  private _pieceDataSource: PieceDataSource;
  private _cashDataSource: CashDataSource;

  private _saleRepository: SaleRepositoryImpl;
  private _customerRepository: CustomerRepositoryImpl;
  private _pieceRepository: PieceRepositoryImpl;
  private _totalInCashRepository: TotalInCashRepositoryImpl;

  constructor() {
    this._saleDataSource = new SaleMockDataSource();
    this._customerDataSource = new CustomerMockDataSource();
    this._pieceDataSource = new PieceMockDataSource();
    this._cashDataSource = new CashMockDataSource();

    this._totalInCashRepository = new TotalInCashRepositoryImpl(
      this._cashDataSource
    );
    this._customerRepository = new CustomerRepositoryImpl(
      this._customerDataSource
    );
    this._pieceRepository = new PieceRepositoryImpl(this._pieceDataSource);
    this._saleRepository = new SaleRepositoryImpl(this._saleDataSource);
  }

  makeHomeViewModel() {
    const getTotalInCashUseCase = new GetTotalInCash(
      this._totalInCashRepository
    );
    const getAllSalesUseCase = new GetAllSales(
      this._saleRepository,
      this._customerRepository,
      this._pieceRepository
    );
    const getLatestSalesUseCase = new GetLatestSales();
    const getTodaySalesUseCase = new GetTodaySales();

    return new HomeViewModel(
      getTotalInCashUseCase,
      getAllSalesUseCase,
      getTodaySalesUseCase,
      getLatestSalesUseCase
    );
  }
}
