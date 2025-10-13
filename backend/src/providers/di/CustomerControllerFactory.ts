// Use cases:
import { GetAllCustomers } from "../../domain/useCases/Customer/GetAllCustomers";
import { AddCustomer } from "../../domain/useCases/Customer/AddCustomer";
import { UpdateCustomer } from "../../domain/useCases/Customer/UpdateCustomer";
import { RemoveCustomer } from "../../domain/useCases/Customer/RemoveCustomer";

// Repositories implementations:
import { CustomerRepositoryImpl } from "../../data/repositories/CustomerRepositoryImpl";

// Data sources:
import { CustomerDataSource } from "../../data/repositories/CustomerRepositoryImpl";

// Data source implementations:
import { CustomerDataSourceImpl } from "../../data/dataSources/CustomerDataSourceImpl";

// Controller:
import { CustomerController } from "../../presentation/controllers/CustomerController";

export class CustomerControllerFactory {
  private _customerDataSource: CustomerDataSource;

  private _customerRepository: CustomerRepositoryImpl;

  constructor() {
    this._customerDataSource = new CustomerDataSourceImpl();

    this._customerRepository = new CustomerRepositoryImpl(
      this._customerDataSource
    );
  }

  makeCustomerController() {
    const getAllCustomers = new GetAllCustomers(this._customerRepository);
    const addCustomer = new AddCustomer(this._customerRepository);
    const updateCustomer = new UpdateCustomer(this._customerRepository);
    const removeCustomer = new RemoveCustomer(this._customerRepository);

    return new CustomerController(
      getAllCustomers,
      addCustomer,
      updateCustomer,
      removeCustomer
    );
  }
}
