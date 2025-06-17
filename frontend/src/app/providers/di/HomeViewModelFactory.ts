// Use cases:
import { GetTotalInCash } from "../../../domain/useCases/GetTotalInCash";
import { GetLatestSales } from "../../../domain/useCases/GetLatestSales";
import { GetTodaySales } from "../../../domain/useCases/GetTodaySales";

// Repositories implementations:
import { SaleRepositoryImpl } from "../../../data/repositories/SaleRepositoryImpl";
import { TotalInCashRepositoryImpl } from "../../../data/repositories/TotalInCashRepositoryImpl";

// Data sources:
import { SaleDataSource } from "../../../data/repositories/SaleRepositoryImpl";
import { CashDataSource } from "../../../data/repositories/TotalInCashRepositoryImpl";

// Data source implementations:
import { SaleMockDataSource } from "../../../data/dataSources/SaleMockDataSource";
import { CashMockDataSource } from "../../../data/dataSources/CashMockDataSource";

//ViewModel:
import { HomeViewModel } from "../../../presentation/viewModels/HomeViewModel";

export class HomeViewModelFactory {
  private _saleDataSource: SaleDataSource;
  private _cashDataSource: CashDataSource;

  private _saleRepository: SaleRepositoryImpl;
  private _totalInCashRepository: TotalInCashRepositoryImpl;

  constructor() {
    this._saleDataSource = new SaleMockDataSource();
    this._cashDataSource = new CashMockDataSource();

    this._totalInCashRepository = new TotalInCashRepositoryImpl(
      this._cashDataSource
    );
    this._saleRepository = new SaleRepositoryImpl(this._saleDataSource);
  }

  makeHomeViewModel() {
    const getTotalInCashUseCase = new GetTotalInCash(
      this._totalInCashRepository
    );
    const getLatestSalesUseCase = new GetLatestSales(this._saleRepository);
    const getTodaySalesUseCase = new GetTodaySales(this._saleRepository);

    return new HomeViewModel(
      getTotalInCashUseCase,
      getLatestSalesUseCase,
      getTodaySalesUseCase
    );
  }
}
