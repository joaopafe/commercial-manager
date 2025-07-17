// Use cases:
import { GetCustomers } from "../../../domain/useCases/GetCustomers";

// Repositores implementations:
import { CustomerRepositoryImpl } from "../../../data/repositories/CustomerRepositoryImpl";

// Data sources:
import { CustomerDataSource } from "../../../data/repositories/CustomerRepositoryImpl";

// Data source implementations:
import { CustomerMockDataSource } from "../../../data/dataSources/CustomersMockDataSource";

// ViewModel:
import { CustomersManagerViewModel } from "../../../presentation/viewModels/CustomersManagerViewModel";

export class CustomersManagerViewModelFactory {
  private _customerDataSource: CustomerDataSource;

  private _customerRepository: CustomerRepositoryImpl;

  constructor() {
    this._customerDataSource = new CustomerMockDataSource();

    this._customerRepository = new CustomerRepositoryImpl(
      this._customerDataSource
    );
  }

  makeCustomersManagerViewModel() {
    const getCustomers = new GetCustomers(this._customerRepository);

    return new CustomersManagerViewModel(getCustomers);
  }
}
