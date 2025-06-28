// Use cases:
import { GetStockGroup } from "../../../domain/useCases/GetStockGroup";
import { InsertStock } from "../../../domain/useCases/InsertStock";

// Repositores implementations:
import { StockRepositoryImpl } from "../../../data/repositories/StockRepositoryImpl";

// Data sources:
import { StockDataSource } from "../../../data/repositories/StockRepositoryImpl";

// Data source implementations:
import { StockMockDataSource } from "../../../data/dataSources/StockMockDataSource";

// ViewModel:
import { StockViewModel } from "../../../presentation/viewModels/StockViewModel";

export class StockViewModelFactory {
  private _stockDataSource: StockDataSource;

  private _stockRepository: StockRepositoryImpl;

  constructor() {
    this._stockDataSource = new StockMockDataSource();

    this._stockRepository = new StockRepositoryImpl(this._stockDataSource);
  }

  makeStockViewModel() {
    const getStockGroup = new GetStockGroup(this._stockRepository);
    const insertStock = new InsertStock(this._stockRepository);

    return new StockViewModel(getStockGroup, insertStock);
  }
}
