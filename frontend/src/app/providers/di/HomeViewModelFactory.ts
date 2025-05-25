// Repositories:
import { SaleRepository } from "../../../domain/data/SaleRepository";
import { TodaySalesRepository } from "../../../domain/data/TodaySalesRepository";
import { TotalInCashRepository } from "../../../domain/data/TotalInCashRepository";

// Data sources:
import { SaleDataSource } from "../../../domain/data/SaleRepository";
import { CashDataSource } from "../../../domain/data/TotalInCashRepository";

// Data source implementations:
import { SaleMockDataSource } from "../../../data/SaleMockDataSource";
import { CashMockDataSource } from "../../../data/CashMockDataSource";

//ViewModel:
import { HomeViewModel } from "../../../presentation/viewModels/HomeViewModel";

export class HomeViewModelFactory {
  private _saleDataSource: SaleDataSource;
  private _cashDataSource: CashDataSource;

  private _saleRepository: SaleRepository;
  private _todaySalesRepository: TodaySalesRepository;
  private _totalInCashRepository: TotalInCashRepository;

  constructor() {
    this._saleDataSource = new SaleMockDataSource();
    this._cashDataSource = new CashMockDataSource();

    this._todaySalesRepository = new TodaySalesRepository(this._saleDataSource);
    this._totalInCashRepository = new TotalInCashRepository(
      this._cashDataSource
    );
    this._saleRepository = new SaleRepository(this._saleDataSource);
  }

  makeHomeViewModel() {
    return new HomeViewModel(
      this._todaySalesRepository,
      this._totalInCashRepository,
      this._saleRepository
    );
  }
}
