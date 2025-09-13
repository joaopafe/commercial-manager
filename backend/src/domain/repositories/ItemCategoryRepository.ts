import { Name, ItemCategory } from "../entities/ItemCategory";
import { Id } from "../entities/shared/Id";

export interface ItemCategoryRepository {
  getAllItemCategories(): Promise<ItemCategory[] | null>;
  getItemCategoryById(id: Id): Promise<ItemCategory | null>;
  createItemCategory(name: Name): Promise<ItemCategory>;
  udpateItemCategory(itemCategory: ItemCategory): Promise<ItemCategory>;
  removeItemCategory(id: Id): Promise<ItemCategory>;
}
