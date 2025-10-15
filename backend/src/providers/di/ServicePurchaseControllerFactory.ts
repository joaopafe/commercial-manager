// Use cases:
import { GetAllServicePurchases } from "../../domain/useCases/ServicePurchase/GetAllServicePurchases";
import { AddServicePurchase } from "../../domain/useCases/ServicePurchase/AddServicePurchase";
import { UpdateServicePurchase } from "../../domain/useCases/ServicePurchase/UpdateServicePurchase";
import { RemoveServicePurchase } from "../../domain/useCases/ServicePurchase/RemoveServicePurchase";

// Repositories implementations:
import { ServicePurchaseRepositoryImpl } from "../../data/repositories/ServicePurchaseRepositoryImpl";
import { SupplierRepositoryImpl } from "../../data/repositories/SupplierRepositoryImpl";

// Data sources:
import { ServicePurchaseDataSource } from "../../data/repositories/ServicePurchaseRepositoryImpl";
import { SupplierDataSource } from "../../data/repositories/SupplierRepositoryImpl";

// Data source implementations:
import { ServicePurchaseDataSourceImpl } from "../../data/dataSources/ServicePurchaseDataSourceImpl";
import { SupplierDataSourceImpl } from "../../data/dataSources/SupplierDataSourceImpl";

// Controller:
import { ServicePurchaseController } from "../../presentation/controllers/ServicePurchaseController";

export class ServicePurchaseControllerFactory {
  private _servicePurchaseDataSource: ServicePurchaseDataSource;
  private _supplierDataSource: SupplierDataSource;

  private _servicePurchaseRepository: ServicePurchaseRepositoryImpl;
  private _supplierRepository: SupplierRepositoryImpl;

  constructor() {
    this._servicePurchaseDataSource = new ServicePurchaseDataSourceImpl();
    this._supplierDataSource = new SupplierDataSourceImpl();

    this._servicePurchaseRepository = new ServicePurchaseRepositoryImpl(
      this._servicePurchaseDataSource
    );
    this._supplierRepository = new SupplierRepositoryImpl(
      this._supplierDataSource
    );
  }

  makeServicePurchaseController() {
    const getAllServicePurchases = new GetAllServicePurchases(
      this._servicePurchaseRepository
    );
    const addServicePurchase = new AddServicePurchase(
      this._servicePurchaseRepository,
      this._supplierRepository
    );
    const updateServicePurchase = new UpdateServicePurchase(
      this._servicePurchaseRepository,
      this._supplierRepository
    );
    const removeServicePurchase = new RemoveServicePurchase(
      this._servicePurchaseRepository
    );

    return new ServicePurchaseController(
      getAllServicePurchases,
      addServicePurchase,
      updateServicePurchase,
      removeServicePurchase
    );
  }
}
