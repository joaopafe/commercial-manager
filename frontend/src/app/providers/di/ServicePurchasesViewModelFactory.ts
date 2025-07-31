// Use cases:
import { GetServicePurchases } from "../../../domain/useCases/GetServicePurchases";
import { GetSuppliers } from "../../../domain/useCases/GetSuppliers";
import { CreateServicePurchase } from "../../../domain/useCases/CreateServicePurchase";
import { EditServicePurchase } from "../../../domain/useCases/EditServicePurchase";

// Repositories implementations:
import { PurchaseRepositoryImpl } from "../../../data/repositories/PurchaseRepositoryImpl";
import { SupplierRepositoryImpl } from "../../../data/repositories/SupplierRepositoryImpl";

// Data sources:
import { PurchaseDataSource } from "../../../data/repositories/PurchaseRepositoryImpl";
import { SupplierDataSource } from "../../../data/repositories/SupplierRepositoryImpl";

// Data source implementations:
import { PurchaseMockDataSource } from "../../../data/dataSources/PurchaseMockDataSource";
import { SupplierMockDataSource } from "../../../data/dataSources/SuppilerMockDataSource";

// View model:
import { ServicePurchasesViewModel } from "../../../presentation/viewModels/ServicePurchasesViewModel";

export class ServicePurchasesViewModelFactory {
  private _purchaseDataSource: PurchaseDataSource;
  private _supplierDataSource: SupplierDataSource;

  private _purchaseRepository: PurchaseRepositoryImpl;
  private _supplierRepository: SupplierRepositoryImpl;

  constructor() {
    this._purchaseDataSource = new PurchaseMockDataSource();
    this._supplierDataSource = new SupplierMockDataSource();

    this._purchaseRepository = new PurchaseRepositoryImpl(
      this._purchaseDataSource
    );
    this._supplierRepository = new SupplierRepositoryImpl(
      this._supplierDataSource
    );
  }

  makeServicePurchasesViewModel() {
    const getServicePurchases = new GetServicePurchases(
      this._purchaseRepository
    );
    const getSuppliers = new GetSuppliers(this._supplierRepository);
    const createServicePurchase = new CreateServicePurchase(
      this._purchaseRepository,
      this._supplierRepository
    );
    const editServicePurchase = new EditServicePurchase(
      this._purchaseRepository,
      this._supplierRepository
    );

    return new ServicePurchasesViewModel(
      getServicePurchases,
      getSuppliers,
      createServicePurchase,
      editServicePurchase
    );
  }
}
