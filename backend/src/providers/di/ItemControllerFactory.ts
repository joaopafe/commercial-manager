// Use cases:
import { GetAllItems } from "../../domain/useCases/Item/GetAllItems";
import { CreateItem } from "../../domain/useCases/Item/CreateItem";
import { UpdateItem } from "../../domain/useCases/Item/UpdateItem";
import { RemoveItem } from "../../domain/useCases/Item/RemoveItem";
import { GetItemStocks } from "../../domain/useCases/Item/GetItemStocks";

// Repositories implementations:
import { ItemRepositoryImpl } from "../../data/repositories/ItemRepositoryImpl";
import { ItemCategoryRepositoryImpl } from "../../data/repositories/ItemCategoryRepositoryImpl";
import { SupplierRepositoryImpl } from "../../data/repositories/SupplierRepositoryImpl";

// Data sources:
import { ItemDataSource } from "../../data/repositories/ItemRepositoryImpl";
import { ItemCategoryDataSource } from "../../data/repositories/ItemCategoryRepositoryImpl";
import { SupplierDataSource } from "../../data/repositories/SupplierRepositoryImpl";

// Data source implementations:
import { ItemDataSourceImpl } from "../../data/dataSources/ItemDataSourceImpl";
import { ItemCategoryDataSourceImpl } from "../../data/dataSources/ItemCategoryDataSourceImpl";
import { SupplierDataSourceImpl } from "../../data/dataSources/SupplierDataSourceImpl";

// Controller:
import { ItemController } from "../../presentation/controllers/ItemController";

export class ItemControllerFactory {
  private _itemDataSource: ItemDataSource;
  private _itemCategoryDataSource: ItemCategoryDataSource;
  private _supplierDataSource: SupplierDataSource;

  private _itemRepository: ItemRepositoryImpl;
  private _itemCategoryRepository: ItemCategoryRepositoryImpl;
  private _supplierRepository: SupplierRepositoryImpl;

  constructor() {
    this._itemDataSource = new ItemDataSourceImpl();
    this._itemCategoryDataSource = new ItemCategoryDataSourceImpl();
    this._supplierDataSource = new SupplierDataSourceImpl();

    this._itemRepository = new ItemRepositoryImpl(
      this._itemDataSource,
      this._itemCategoryDataSource
    );
    this._itemCategoryRepository = new ItemCategoryRepositoryImpl(
      this._itemCategoryDataSource
    );
    this._supplierRepository = new SupplierRepositoryImpl(
      this._supplierDataSource
    );
  }

  makeItemController() {
    const getAllItems = new GetAllItems(this._itemRepository);
    const createItem = new CreateItem(
      this._itemRepository,
      this._itemCategoryRepository,
      this._supplierRepository
    );
    const updateItem = new UpdateItem(
      this._itemRepository,
      this._itemCategoryRepository,
      this._supplierRepository
    );
    const removeItem = new RemoveItem(this._itemRepository);
    const getItemStocks = new GetItemStocks(this._itemRepository);

    return new ItemController(
      getAllItems,
      createItem,
      updateItem,
      removeItem,
      getItemStocks
    );
  }
}
