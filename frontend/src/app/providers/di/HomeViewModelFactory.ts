// Use cases:
import { GetTotalInCash } from "../../../domain/useCases/GetTotalInCash";
import { GetAllSales } from "../../../domain/useCases/GetAllSales";
import { GetTodaySales } from "../../../domain/useCases/GetTodaySales";
import { GetLatestSales } from "../../../domain/useCases/GetLatestSales";
import { GetAllPurchases } from "../../../domain/useCases/GetAllPurchases";

// Repositories implementations:
import { SaleRepositoryImpl } from "../../../data/repositories/SaleRepositoryImpl";
import { CustomerRepositoryImpl } from "../../../data/repositories/CustomerRepositoryImpl";
import { PieceRepositoryImpl } from "../../../data/repositories/PieceRepositoryImpl";
import { PurchaseRepositoryImpl } from "../../../data/repositories/PurchaseRepositoryImpl";
import { SupplierRepositoryImpl } from "../../../data/repositories/SupplierRepositoryImpl";

// Data sources:
import { SaleDataSource } from "../../../data/repositories/SaleRepositoryImpl";
import { CustomerDataSource } from "../../../data/repositories/CustomerRepositoryImpl";
import { PieceDataSource } from "../../../data/repositories/PieceRepositoryImpl";
import { PurchaseDataSource } from "../../../data/repositories/PurchaseRepositoryImpl";
import { SupplierDataSource } from "../../../data/repositories/SupplierRepositoryImpl";

// Data source implementations:
import { SaleMockDataSource } from "../../../data/dataSources/SaleMockDataSource";
import { CustomerMockDataSource } from "../../../data/dataSources/CustomersMockDataSource";
import { PieceMockDataSource } from "../../../data/dataSources/PieceMockDataSource";
import { PurchaseMockDataSource } from "../../../data/dataSources/PurchaseMockDataSource";
import { SupplierMockDataSource } from "../../../data/dataSources/SuppilerMockDataSource";

//ViewModel:
import { HomeViewModel } from "../../../presentation/viewModels/HomeViewModel";

export class HomeViewModelFactory {
  private _saleDataSource: SaleDataSource;
  private _customerDataSource: CustomerDataSource;
  private _pieceDataSource: PieceDataSource;
  private _purchaseDataSource: PurchaseDataSource;
  private _supplierDataSource: SupplierDataSource;

  private _saleRepository: SaleRepositoryImpl;
  private _customerRepository: CustomerRepositoryImpl;
  private _pieceRepository: PieceRepositoryImpl;
  private _purchaseRepository: PurchaseRepositoryImpl;
  private _supplierRepository: SupplierRepositoryImpl;

  constructor() {
    this._saleDataSource = new SaleMockDataSource();
    this._customerDataSource = new CustomerMockDataSource();
    this._pieceDataSource = new PieceMockDataSource();
    this._purchaseDataSource = new PurchaseMockDataSource();
    this._supplierDataSource = new SupplierMockDataSource();

    this._purchaseRepository = new PurchaseRepositoryImpl(
      this._purchaseDataSource
    );
    this._customerRepository = new CustomerRepositoryImpl(
      this._customerDataSource
    );
    this._pieceRepository = new PieceRepositoryImpl(this._pieceDataSource);
    this._saleRepository = new SaleRepositoryImpl(this._saleDataSource);
    this._supplierRepository = new SupplierRepositoryImpl(
      this._supplierDataSource
    );
  }

  makeHomeViewModel() {
    const getTotalInCashUseCase = new GetTotalInCash();
    const getAllSalesUseCase = new GetAllSales(
      this._saleRepository,
      this._customerRepository,
      this._pieceRepository
    );
    const getLatestSalesUseCase = new GetLatestSales();
    const getTodaySalesUseCase = new GetTodaySales();
    const getAllPurchasesUseCase = new GetAllPurchases(
      this._purchaseRepository,
      this._supplierRepository,
      this._pieceRepository
    );

    return new HomeViewModel(
      getTotalInCashUseCase,
      getAllSalesUseCase,
      getTodaySalesUseCase,
      getLatestSalesUseCase,
      getAllPurchasesUseCase
    );
  }
}
