// Use cases:
import { GetAllServiceSales } from "../../domain/useCases/ServiceSale/GetAllServiceSales";
import { AddServiceSale } from "../../domain/useCases/ServiceSale/AddServiceSale";
import { UpdateServiceSale } from "../../domain/useCases/ServiceSale/UpdateServiceSale";
import { RemoveServiceSale } from "../../domain/useCases/ServiceSale/RemoveServiceSale";

// Repositories implementations:
import { ServiceSaleRepositoryImpl } from "../../data/repositories/ServiceSaleRepositoryImpl";
import { CustomerRepositoryImpl } from "../../data/repositories/CustomerRepositoryImpl";

// Data sources:
import { ServiceSaleDataSource } from "../../data/repositories/ServiceSaleRepositoryImpl";
import { CustomerDataSource } from "../../data/repositories/CustomerRepositoryImpl";

// Data source implementations:
import { ServiceSaleDataSourceImpl } from "../../data/dataSources/ServiceSaleDataSourceImpl";
import { CustomerDataSourceImpl } from "../../data/dataSources/CustomerDataSourceImpl";

// Controller:
import { ServiceSaleController } from "../../presentation/controllers/ServiceSaleController";

export class ServiceSaleControllerFactory {
  private _serviceSaleDataSource: ServiceSaleDataSource;
  private _customerDataSource: CustomerDataSource;

  private _serviceSaleRepository: ServiceSaleRepositoryImpl;
  private _customerRepository: CustomerRepositoryImpl;

  constructor() {
    this._serviceSaleDataSource = new ServiceSaleDataSourceImpl();
    this._customerDataSource = new CustomerDataSourceImpl();

    this._serviceSaleRepository = new ServiceSaleRepositoryImpl(
      this._serviceSaleDataSource
    );
    this._customerRepository = new CustomerRepositoryImpl(
      this._customerDataSource
    );
  }

  makeServiceSaleController() {
    const getAllServiceSales = new GetAllServiceSales(
      this._serviceSaleRepository
    );
    const addServiceSale = new AddServiceSale(
      this._serviceSaleRepository,
      this._customerRepository
    );
    const updateServiceSale = new UpdateServiceSale(
      this._serviceSaleRepository,
      this._customerRepository
    );
    const removeServiceSale = new RemoveServiceSale(
      this._serviceSaleRepository
    );

    return new ServiceSaleController(
      getAllServiceSales,
      addServiceSale,
      updateServiceSale,
      removeServiceSale
    );
  }
}
