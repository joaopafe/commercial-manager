// Use cases:
import { GetAllProductSales } from "../../domain/useCases/ProductSale/GetAllProductSales";
import { GetProductSaleById } from "../../domain/useCases/ProductSale/GetProductSaleById";
import { AddProductSale } from "../../domain/useCases/ProductSale/AddProductSale";
import { UpdateProductSale } from "../../domain/useCases/ProductSale/UpdateProductSale";
import { RemoveProductSale } from "../../domain/useCases/ProductSale/RemoveProductSale";
import { AddStock } from "../../domain/useCases/Item/AddStock";
import { RemoveStock } from "../../domain/useCases/Item/RemoveStock";

// Repositories implementations:
import { ProductSaleRepositoryImpl } from "../../data/repositories/ProductSaleRepositoryImpl";
import { CustomerRepositoryImpl } from "../../data/repositories/CustomerRepositoryImpl";
import { ItemRepositoryImpl } from "../../data/repositories/ItemRepositoryImpl";

// Data sources:
import { ProductSaleDataSource } from "../../data/repositories/ProductSaleRepositoryImpl";
import { CustomerDataSource } from "../../data/repositories/CustomerRepositoryImpl";
import { ItemDataSource } from "../../data/repositories/ItemRepositoryImpl";
import { ItemCategoryDataSource } from "../../data/repositories/ItemCategoryRepositoryImpl";

// Data source implementations:
import { ProductSaleDataSourceImpl } from "../../data/dataSources/ProductSaleDataSourceImpl";
import { CustomerDataSourceImpl } from "../../data/dataSources/CustomerDataSourceImpl";
import { ItemDataSourceImpl } from "../../data/dataSources/ItemDataSourceImpl";
import { ItemCategoryDataSourceImpl } from "../../data/dataSources/ItemCategoryDataSourceImpl";

// Controller:
import { ProductSaleController } from "../../presentation/controllers/ProductSaleController";

export class ProductSaleControllerFactory {
  private _productSaleDataSource: ProductSaleDataSource;
  private _customerDataSource: CustomerDataSource;
  private _itemDataSource: ItemDataSource;
  private _itemCategoryDataSource: ItemCategoryDataSource;

  private _productSaleRepository: ProductSaleRepositoryImpl;
  private _customerRepository: CustomerRepositoryImpl;
  private _itemRepository: ItemRepositoryImpl;

  constructor() {
    this._productSaleDataSource = new ProductSaleDataSourceImpl();
    this._customerDataSource = new CustomerDataSourceImpl();
    this._itemDataSource = new ItemDataSourceImpl();
    this._itemCategoryDataSource = new ItemCategoryDataSourceImpl();

    this._productSaleRepository = new ProductSaleRepositoryImpl(
      this._productSaleDataSource
    );
    this._customerRepository = new CustomerRepositoryImpl(
      this._customerDataSource
    );
    this._itemRepository = new ItemRepositoryImpl(
      this._itemDataSource,
      this._itemCategoryDataSource
    );
  }

  makeProductSaleController() {
    const getAllProductSales = new GetAllProductSales(
      this._productSaleRepository
    );
    const getProductSaleById = new GetProductSaleById(
      this._productSaleRepository
    );
    const addProductSale = new AddProductSale(
      this._productSaleRepository,
      this._customerRepository,
      this._itemRepository
    );
    const updateProductSale = new UpdateProductSale(
      this._productSaleRepository,
      this._customerRepository,
      this._itemRepository
    );
    const removeProductSale = new RemoveProductSale(
      this._productSaleRepository
    );
    const addStock = new AddStock(this._itemRepository);
    const removeStock = new RemoveStock(this._itemRepository);

    return new ProductSaleController(
      getAllProductSales,
      getProductSaleById,
      addProductSale,
      updateProductSale,
      removeProductSale,
      addStock,
      removeStock
    );
  }
}
