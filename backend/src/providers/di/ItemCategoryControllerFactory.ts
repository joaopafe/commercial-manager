// Use cases:
import { GetAllItemCategories } from "../../domain/useCases/ItemCategory/GetAllItemCategories";
import { CreateItemCategory } from "../../domain/useCases/ItemCategory/CreateItemCategory";
import { RemoveItemCategory } from "../../domain/useCases/ItemCategory/RemoveItemCategory";

// Repositories implementations:
import { ItemCategoryRepositoryImpl } from "../../data/repositories/ItemCategoryRepositoryImpl";

// Data sources:
import { ItemCategoryDataSource } from "../../data/repositories/ItemCategoryRepositoryImpl";

// Data source implementations:
import { ItemCategoryDataSourceImpl } from "../../data/dataSources/ItemCategoryDataSourceImpl";

// Controller:
import { ItemCategoryController } from "../../presentation/controllers/ItemCategoryController";

export class ItemCategoryControllerFactory {
  private _itemCategoryDataSource: ItemCategoryDataSource;

  private _itemCategoryRepository: ItemCategoryRepositoryImpl;

  constructor() {
    this._itemCategoryDataSource = new ItemCategoryDataSourceImpl();

    this._itemCategoryRepository = new ItemCategoryRepositoryImpl(
      this._itemCategoryDataSource
    );
  }

  makeItemCategoryController() {
    const getAllItemCategories = new GetAllItemCategories(
      this._itemCategoryRepository
    );
    const createItemCategory = new CreateItemCategory(
      this._itemCategoryRepository
    );
    const removeItemCategory = new RemoveItemCategory(
      this._itemCategoryRepository
    );

    return new ItemCategoryController(
      getAllItemCategories,
      createItemCategory,
      removeItemCategory
    );
  }
}
