// Use cases:
import { GetAllSuppliers } from "../../domain/useCases/Supplier/GetAllSuppliers";
import { AddSupplier } from "../../domain/useCases/Supplier/AddSupplier";
import { UpdateSupplier } from "../../domain/useCases/Supplier/UpdateSupplier";
import { RemoveSupplier } from "../../domain/useCases/Supplier/RemoveSupplier";

// Repositories implementations:
import { SupplierRepositoryImpl } from "../../data/repositories/SupplierRepositoryImpl";

// Data sources:
import { SupplierDataSource } from "../../data/repositories/SupplierRepositoryImpl";

// Data source implementations:
import { SupplierDataSourceImpl } from "../../data/dataSources/SupplierDataSourceImpl";

// Controller:
import { SupplierController } from "../../presentation/controllers/SupplierController";

export class SupplierControllerFactory {
  private _supplierDataSource: SupplierDataSource;

  private _supplierRepository: SupplierRepositoryImpl;

  constructor() {
    this._supplierDataSource = new SupplierDataSourceImpl();

    this._supplierRepository = new SupplierRepositoryImpl(
      this._supplierDataSource
    );
  }

  makeSupplierController() {
    const getAllSuppliers = new GetAllSuppliers(this._supplierRepository);
    const addSupplier = new AddSupplier(this._supplierRepository);
    const updateSupplier = new UpdateSupplier(this._supplierRepository);
    const removeSupplier = new RemoveSupplier(this._supplierRepository);

    return new SupplierController(
      getAllSuppliers,
      addSupplier,
      updateSupplier,
      removeSupplier
    );
  }
}
