// Use cases:
import { GetSuppliers } from "../../../domain/useCases/GetSuppliers";
import { CreateSupplier } from "../../../domain/useCases/CreateSupplier";
import { EditSupplier } from "../../../domain/useCases/EditSupplier";
import { RemoveSupplier } from "../../../domain/useCases/RemoveSupplier";

// Repositories implementations:
import { SupplierRepositoryImpl } from "../../../data/repositories/SupplierRepositoryImpl";

// Data sources:
import { SupplierDataSource } from "../../../data/repositories/SupplierRepositoryImpl";

// Data source implementations:
import { SupplierMockDataSource } from "../../../data/dataSources/SuppilerMockDataSource";

// ViewModel:
import { SuppliersManagerViewModel } from "../../../presentation/viewModels/SuppliersManagerViewModel";

export class SuppliersManagerViewModelFactory {
  private _supplierDataSource: SupplierDataSource;

  private _supplierRepository: SupplierRepositoryImpl;

  constructor() {
    this._supplierDataSource = new SupplierMockDataSource();

    this._supplierRepository = new SupplierRepositoryImpl(
      this._supplierDataSource
    );
  }

  makeSuppliersManagerViewModel() {
    const getSuppliers = new GetSuppliers(this._supplierRepository);
    const createSupplier = new CreateSupplier(this._supplierRepository);
    const editSupplier = new EditSupplier(this._supplierRepository);
    const removeSupplier = new RemoveSupplier(this._supplierRepository);

    return new SuppliersManagerViewModel(
      getSuppliers,
      createSupplier,
      editSupplier,
      removeSupplier
    );
  }
}
