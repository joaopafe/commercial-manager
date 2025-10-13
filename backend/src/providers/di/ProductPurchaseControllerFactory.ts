// Use cases:
import { GetAllProductPurchases } from "../../domain/useCases/ProductPurchase/GetAllProductPurchases";
import { GetProductPurchaseById } from "../../domain/useCases/ProductPurchase/GetProductPurchaseById";
import { AddProductPurchase } from "../../domain/useCases/ProductPurchase/AddProductPurchase";
import { UpdateProductPurchase } from "../../domain/useCases/ProductPurchase/UpdateProductPurchase";
import { RemoveProductPurchase } from "../../domain/useCases/ProductPurchase/RemoveProductPurchase";
import { AddStock } from "../../domain/useCases/Item/AddStock";
import { RemoveStock } from "../../domain/useCases/Item/RemoveStock";

// Repositories implementations:
import { ProductPurchaseRepositoryImpl } from "../../data/repositories/ProductPurchaseRepositoryImpl";
import { SupplierRepositoryImpl } from "../../data/repositories/SupplierRepositoryImpl";
import { ItemRepositoryImpl } from "../../data/repositories/ItemRepositoryImpl";

// Data sources:
import { ProductPurchaseDataSource } from "../../data/repositories/ProductPurchaseRepositoryImpl";
import { SupplierDataSource } from "../../data/repositories/SupplierRepositoryImpl";
import { ItemDataSource } from "../../data/repositories/ItemRepositoryImpl";
import { ItemCategoryDataSource } from "../../data/repositories/ItemCategoryRepositoryImpl";

// Data source implementations:
import { ProductPurchaseDataSourceImpl } from "../../data/dataSources/ProductPurchaseDataSourceImpl";
import { SupplierDataSourceImpl } from "../../data/dataSources/SupplierDataSourceImpl";
import { ItemDataSourceImpl } from "../../data/dataSources/ItemDataSourceImpl";
import { ItemCategoryDataSourceImpl } from "../../data/dataSources/ItemCategoryDataSourceImpl";

// Controller:
import { ProductPurchaseController } from "../../presentation/controllers/ProductPurchaseController";

export class ProductPurchaseControllerFactory {
  private _productPurchaseDataSource: ProductPurchaseDataSource;
  private _supplierDataSource: SupplierDataSource;
  private _itemDataSource: ItemDataSource;
  private _itemCategoryDataSource: ItemCategoryDataSource;

  private _productPurchaseRepository: ProductPurchaseRepositoryImpl;
  private _supplierRepository: SupplierRepositoryImpl;
  private _itemRepository: ItemRepositoryImpl;

  constructor() {
    this._productPurchaseDataSource = new ProductPurchaseDataSourceImpl();
    this._supplierDataSource = new SupplierDataSourceImpl();
    this._itemDataSource = new ItemDataSourceImpl();
    this._itemCategoryDataSource = new ItemCategoryDataSourceImpl();

    this._productPurchaseRepository = new ProductPurchaseRepositoryImpl(
      this._productPurchaseDataSource
    );
    this._supplierRepository = new SupplierRepositoryImpl(
      this._supplierDataSource
    );
    this._itemRepository = new ItemRepositoryImpl(
      this._itemDataSource,
      this._itemCategoryDataSource
    );
  }

  makeProductPurchaseController() {
    const getAllProductPurchases = new GetAllProductPurchases(
      this._productPurchaseRepository
    );
    const getProductPurchaseById = new GetProductPurchaseById(
      this._productPurchaseRepository
    );
    const addProductPurchase = new AddProductPurchase(
      this._productPurchaseRepository,
      this._supplierRepository,
      this._itemRepository
    );
    const updateProductPurchase = new UpdateProductPurchase(
      this._productPurchaseRepository,
      this._supplierRepository,
      this._itemRepository
    );
    const removeProductPurchase = new RemoveProductPurchase(
      this._productPurchaseRepository
    );
    const addStock = new AddStock(this._itemRepository);
    const removeStock = new RemoveStock(this._itemRepository);

    return new ProductPurchaseController(
      getAllProductPurchases,
      getProductPurchaseById,
      addProductPurchase,
      updateProductPurchase,
      removeProductPurchase,
      addStock,
      removeStock
    );
  }
}
