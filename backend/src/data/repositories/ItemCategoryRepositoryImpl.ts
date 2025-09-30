import { Name, ItemCategory } from "../../domain/entities/ItemCategory";
import { Id } from "../../domain/entities/shared/Id";

import { ItemCategoryRepository } from "../../domain/repositories/ItemCategoryRepository";

export interface ItemCategoryData {
  id: number;
  name: string;
}

export interface ItemCategoryDataSource {
  createTable(): Promise<boolean>;
  findAll(): Promise<ItemCategoryData[]>;
  findById(id: number): Promise<ItemCategoryData>;
  create(name: string): Promise<ItemCategoryData>;
  update(itemCategory: ItemCategoryData): Promise<ItemCategoryData>;
  remove(id: number): Promise<ItemCategoryData>;
}

export class ItemCategoryRepositoryImpl implements ItemCategoryRepository {
  constructor(private itemCategoryDataSource: ItemCategoryDataSource) {}

  async getAllItemCategories(): Promise<ItemCategory[] | null> {
    const itemCatogories = await this.itemCategoryDataSource.findAll();

    const mappedItemCategories = itemCatogories.map((itemCategory) => {
      const id = new Id(itemCategory.id);
      const name = new Name(itemCategory.name);

      return new ItemCategory(id, name);
    });

    return mappedItemCategories;
  }

  async getItemCategoryById(id: Id): Promise<ItemCategory | null> {
    const itemCategory = await this.itemCategoryDataSource.findById(id.id);

    const itemCategoryId = new Id(itemCategory.id);
    const name = new Name(itemCategory.name);

    return new ItemCategory(itemCategoryId, name);
  }

  async createItemCategory(name: Name): Promise<ItemCategory> {
    const createdItemCategory = await this.itemCategoryDataSource.create(
      name.name
    );

    const id = new Id(createdItemCategory.id);
    const categoryName = new Name(createdItemCategory.name);

    return new ItemCategory(id, categoryName);
  }

  async udpateItemCategory(itemCategory: ItemCategory): Promise<ItemCategory> {
    const udpateItemCategory = await this.itemCategoryDataSource.update({
      id: itemCategory.id,
      name: itemCategory.name,
    });

    const id = new Id(udpateItemCategory.id);
    const name = new Name(udpateItemCategory.name);

    return new ItemCategory(id, name);
  }

  async removeItemCategory(id: Id): Promise<ItemCategory> {
    const removedItemCategory = await this.itemCategoryDataSource.remove(id.id);

    const itemCategoryId = new Id(removedItemCategory.id);
    const name = new Name(removedItemCategory.name);

    return new ItemCategory(itemCategoryId, name);
  }
}
