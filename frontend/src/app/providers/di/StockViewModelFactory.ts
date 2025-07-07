// Use cases:
import { GetStockGroup } from "../../../domain/useCases/GetStockGroup";
import { InsertStock } from "../../../domain/useCases/InsertStock";
import { RemoveStock } from "../../../domain/useCases/RemoveStock";
import { GetSuppliers } from "../../../domain/useCases/GetSuppliers";

// Repositores implementations:
import { StockRepositoryImpl } from "../../../data/repositories/StockRepositoryImpl";
import { SupplierRepositoryImpl } from "../../../data/repositories/SupplierRepositoryImpl";

// Data sources:
import { StockDataSource } from "../../../data/repositories/StockRepositoryImpl";
import { SupplierDataSource } from "../../../data/repositories/SupplierRepositoryImpl";

// Data source implementations:
import { StockMockDataSource } from "../../../data/dataSources/StockMockDataSource";
import { SupplierMockDataSource } from "../../../data/dataSources/SuppilerMockDataSource";

// ViewModel:
import { StockViewModel } from "../../../presentation/viewModels/StockViewModel";

export class StockViewModelFactory {
  private _stockDataSource: StockDataSource;
  private _supplierDataSource: SupplierDataSource;

  private _stockRepository: StockRepositoryImpl;
  private _supplierRepository: SupplierRepositoryImpl;

  constructor() {
    this._stockDataSource = new StockMockDataSource();
    this._supplierDataSource = new SupplierMockDataSource();

    this._stockRepository = new StockRepositoryImpl(this._stockDataSource);
    this._supplierRepository = new SupplierRepositoryImpl(
      this._supplierDataSource
    );
  }

  makeStockViewModel() {
    const getStockGroup = new GetStockGroup(this._stockRepository);
    const insertStock = new InsertStock(this._stockRepository);
    const removeStock = new RemoveStock(this._stockRepository);
    const getSuppliers = new GetSuppliers(this._supplierRepository);

    return new StockViewModel(
      getStockGroup,
      insertStock,
      removeStock,
      getSuppliers
    );
  }
}
