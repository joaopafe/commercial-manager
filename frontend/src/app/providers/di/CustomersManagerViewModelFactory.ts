// Use cases:
import { GetCustomers } from "../../../domain/useCases/GetCustomers";
import { CreateCustomer } from "../../../domain/useCases/CreateCustomer";
import { EditCustomer } from "../../../domain/useCases/EditCustomer";
import { RemoveCustomer } from "../../../domain/useCases/RemoveCustomer";

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
    const createCustomer = new CreateCustomer(this._customerRepository);
    const editCustomer = new EditCustomer(this._customerRepository);
    const removeCustomer = new RemoveCustomer(this._customerRepository);

    return new CustomersManagerViewModel(
      getCustomers,
      createCustomer,
      editCustomer,
      removeCustomer
    );
  }
}
