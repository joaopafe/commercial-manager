// Repositores:
import { StockRepository } from "../../../domain/data/StockRepository";

// Data sources:
import { StockDataSource } from "../../../domain/data/StockRepository";

// Data source implementations:
import { StockMockDataSource } from "../../../data/StockMockDataSource";

// ViewModel:
import { StockViewModel } from "../../../presentation/viewModels/StockViewModel";

export class StockViewModelFactory {
  private _stockDataSource: StockDataSource;

  private _stockRepository: StockRepository;

  constructor() {
    this._stockDataSource = new StockMockDataSource();

    this._stockRepository = new StockRepository(this._stockDataSource);
  }

  makeStockViewModel() {
    return new StockViewModel(this._stockRepository);
  }
}
