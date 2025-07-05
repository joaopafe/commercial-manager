// Use cases:
import { GetSuppliers } from "../../../domain/useCases/GetSuppliers";

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

    return new SuppliersManagerViewModel(getSuppliers);
  }
}
