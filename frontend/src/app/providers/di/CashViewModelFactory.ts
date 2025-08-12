// Use cases:
import { GetAllCashRegisters } from "../../../domain/useCases/GetAllCashRegisters";
import { GetAllPurchases } from "../../../domain/useCases/GetAllPurchases";
import { GetAllSales } from "../../../domain/useCases/GetAllSales";
import { GetTotalOutputs } from "../../../domain/useCases/GetTotalOutputs";
import { GetTotalEntries } from "../../../domain/useCases/GetTotalEntries";
import { GetTotalInCash } from "../../../domain/useCases/GetTotalInCash";

// Repositories implementations:
import { PurchaseRepositoryImpl } from "../../../data/repositories/PurchaseRepositoryImpl";
import { SupplierRepositoryImpl } from "../../../data/repositories/SupplierRepositoryImpl";
import { PieceRepositoryImpl } from "../../../data/repositories/PieceRepositoryImpl";
import { SaleRepositoryImpl } from "../../../data/repositories/SaleRepositoryImpl";
import { CustomerRepositoryImpl } from "../../../data/repositories/CustomerRepositoryImpl";

// Data sources:
import { PurchaseDataSource } from "../../../data/repositories/PurchaseRepositoryImpl";
import { SupplierDataSource } from "../../../data/repositories/SupplierRepositoryImpl";
import { PieceDataSource } from "../../../data/repositories/PieceRepositoryImpl";
import { SaleDataSource } from "../../../data/repositories/SaleRepositoryImpl";
import { CustomerDataSource } from "../../../data/repositories/CustomerRepositoryImpl";

// Data source implementations:
import { PurchaseMockDataSource } from "../../../data/dataSources/PurchaseMockDataSource";
import { SupplierMockDataSource } from "../../../data/dataSources/SuppilerMockDataSource";
import { PieceMockDataSource } from "../../../data/dataSources/PieceMockDataSource";
import { SaleMockDataSource } from "../../../data/dataSources/SaleMockDataSource";
import { CustomerMockDataSource } from "../../../data/dataSources/CustomersMockDataSource";

// ViewModel:
import { CashViewModel } from "../../../presentation/viewModels/CashViewModel";

export class CashViewModelFactory {
  private _purchaseDataSource: PurchaseDataSource;
  private _supplierDataSource: SupplierDataSource;
  private _pieceDataSource: PieceDataSource;
  private _saleDataSource: SaleDataSource;
  private _customerDataSource: CustomerDataSource;

  private _purchaseRepository: PurchaseRepositoryImpl;
  private _supplierRepository: SupplierRepositoryImpl;
  private _pieceRepository: PieceRepositoryImpl;
  private _saleRepository: SaleRepositoryImpl;
  private _customerRepository: CustomerRepositoryImpl;

  constructor() {
    this._purchaseDataSource = new PurchaseMockDataSource();
    this._supplierDataSource = new SupplierMockDataSource();
    this._pieceDataSource = new PieceMockDataSource();
    this._saleDataSource = new SaleMockDataSource();
    this._customerDataSource = new CustomerMockDataSource();

    this._purchaseRepository = new PurchaseRepositoryImpl(
      this._purchaseDataSource
    );
    this._supplierRepository = new SupplierRepositoryImpl(
      this._supplierDataSource
    );
    this._pieceRepository = new PieceRepositoryImpl(this._pieceDataSource);
    this._saleRepository = new SaleRepositoryImpl(this._saleDataSource);
    this._customerRepository = new CustomerRepositoryImpl(
      this._customerDataSource
    );
  }

  makeCashViewModel() {
    const getAllCashRegisters = new GetAllCashRegisters();
    const getAllPurchases = new GetAllPurchases(
      this._purchaseRepository,
      this._supplierRepository,
      this._pieceRepository
    );
    const getAllSales = new GetAllSales(
      this._saleRepository,
      this._customerRepository,
      this._pieceRepository
    );
    const getTotalOutputs = new GetTotalOutputs();
    const getTotalEntries = new GetTotalEntries();
    const getTotalInCash = new GetTotalInCash();

    return new CashViewModel(
      getAllCashRegisters,
      getAllPurchases,
      getAllSales,
      getTotalOutputs,
      getTotalEntries,
      getTotalInCash
    );
  }
}
