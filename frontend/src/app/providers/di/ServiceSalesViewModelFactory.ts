// Use cases:
import { GetServiceSales } from "../../../domain/useCases/GetServiceSales";
import { GetCustomers } from "../../../domain/useCases/GetCustomers";
import { CreateServiceSale } from "../../../domain/useCases/CreateServiceSale";
import { EditServiceSale } from "../../../domain/useCases/EditServiceSale";

// Repositories implementations:
import { SaleRepositoryImpl } from "../../../data/repositories/SaleRepositoryImpl";
import { CustomerRepositoryImpl } from "../../../data/repositories/CustomerRepositoryImpl";

// Data sources:
import { SaleDataSource } from "../../../data/repositories/SaleRepositoryImpl";
import { CustomerDataSource } from "../../../data/repositories/CustomerRepositoryImpl";

// Data source implementations:
import { SaleMockDataSource } from "../../../data/dataSources/SaleMockDataSource";
import { CustomerMockDataSource } from "../../../data/dataSources/CustomersMockDataSource";

// View model:
import { ServiceSalesViewModel } from "../../../presentation/viewModels/ServiceSalesViewMode";

export class ServiceSalesViewModelFactory {
  private _saleDataSource: SaleDataSource;
  private _customerDataSource: CustomerDataSource;

  private _saleRepository: SaleRepositoryImpl;
  private _customerRepository: CustomerRepositoryImpl;

  constructor() {
    this._saleDataSource = new SaleMockDataSource();
    this._customerDataSource = new CustomerMockDataSource();

    this._saleRepository = new SaleRepositoryImpl(this._saleDataSource);
    this._customerRepository = new CustomerRepositoryImpl(
      this._customerDataSource
    );
  }

  makeServiceSalesViewModel() {
    const getServiceSales = new GetServiceSales(this._saleRepository);
    const getCustomer = new GetCustomers(this._customerRepository);
    const createServiceSale = new CreateServiceSale(
      this._saleRepository,
      this._customerRepository
    );
    const editServiceSale = new EditServiceSale(
      this._saleRepository,
      this._customerRepository
    );

    return new ServiceSalesViewModel(
      getServiceSales,
      getCustomer,
      createServiceSale,
      editServiceSale
    );
  }
}
