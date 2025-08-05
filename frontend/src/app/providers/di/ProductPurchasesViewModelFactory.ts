// Use cases:
import { GetProductPurchases } from "../../../domain/useCases/GetProductPurchases";
import { GetSuppliers } from "../../../domain/useCases/GetSuppliers";
import { GetParts } from "../../../domain/useCases/GetParts";
import { CreateProductPurchase } from "../../../domain/useCases/CreateProductPurchase";
import { EditProductPurchase } from "../../../domain/useCases/EditProductPurchase";
import { RemoveProductPurchase } from "../../../domain/useCases/RemoveProductPurchase";

// Repositories implementations:
import { PurchaseRepositoryImpl } from "../../../data/repositories/PurchaseRepositoryImpl";
import { SupplierRepositoryImpl } from "../../../data/repositories/SupplierRepositoryImpl";
import { PieceRepositoryImpl } from "../../../data/repositories/PieceRepositoryImpl";

// Data sources:
import { PurchaseDataSource } from "../../../data/repositories/PurchaseRepositoryImpl";
import { SupplierDataSource } from "../../../data/repositories/SupplierRepositoryImpl";
import { PieceDataSource } from "../../../data/repositories/PieceRepositoryImpl";

// Data source implementations:
import { PurchaseMockDataSource } from "../../../data/dataSources/PurchaseMockDataSource";
import { SupplierMockDataSource } from "../../../data/dataSources/SuppilerMockDataSource";
import { PieceMockDataSource } from "../../../data/dataSources/PieceMockDataSource";

// View model:
import { ProductPurchasesViewModel } from "../../../presentation/viewModels/ProductPurchasesViewModel";

export class ProductPurchasesViewModelFactory {
  private _purchaseDataSource: PurchaseDataSource;
  private _supplierDataSource: SupplierDataSource;
  private _pieceDataSource: PieceDataSource;

  private _purchaseRepository: PurchaseRepositoryImpl;
  private _supplierRepository: SupplierRepositoryImpl;
  private _pieceRepository: PieceRepositoryImpl;

  constructor() {
    this._purchaseDataSource = new PurchaseMockDataSource();
    this._supplierDataSource = new SupplierMockDataSource();
    this._pieceDataSource = new PieceMockDataSource();

    this._purchaseRepository = new PurchaseRepositoryImpl(
      this._purchaseDataSource
    );
    this._supplierRepository = new SupplierRepositoryImpl(
      this._supplierDataSource
    );
    this._pieceRepository = new PieceRepositoryImpl(this._pieceDataSource);
  }

  makeProductPurchasesViewModel() {
    const getProductPurchases = new GetProductPurchases(
      this._purchaseRepository
    );
    const getSuppliers = new GetSuppliers(this._supplierRepository);
    const getParts = new GetParts(this._pieceRepository);
    const createProductPurchase = new CreateProductPurchase(
      this._purchaseRepository,
      this._supplierRepository,
      this._pieceRepository
    );
    const editProductPurchase = new EditProductPurchase(
      this._purchaseRepository,
      this._supplierRepository,
      this._pieceRepository
    );
    const removeProductPurchase = new RemoveProductPurchase(
      this._purchaseRepository
    );

    return new ProductPurchasesViewModel(
      getProductPurchases,
      getSuppliers,
      getParts,
      createProductPurchase,
      editProductPurchase,
      removeProductPurchase
    );
  }
}
