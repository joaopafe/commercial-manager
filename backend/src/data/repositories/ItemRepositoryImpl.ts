import {
  Name,
  CategoryId,
  Price,
  SupplierId,
  StockQuantity,
  Item,
} from "../../domain/entities/Item";
import { Id } from "../../domain/entities/shared/Id";

import {
  ItemRepository,
  ItemWithoutStock,
  StockByCategory,
  ParamsForItemCreation,
} from "../../domain/repositories/ItemRepository";

import { ItemCategoryDataSource } from "./ItemCategoryRepositoryImpl";

export interface ItemData {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  supplierId: number;
  stockQuantity: number;
}

export interface ItemDataSource {
  createTable(): Promise<boolean>;
  findAll(): Promise<ItemData[]>;
  findById(id: number): Promise<ItemData>;
  create(item: Omit<ItemData, "id" | "stockQuantity">): Promise<ItemData>;
  update(item: Omit<ItemData, "stockQuantity">): Promise<ItemData>;
  remove(id: number): Promise<ItemData>;
  updateStock(id: number, stockQuantity: number): Promise<ItemData>;
}

export class ItemRepositoryImpl implements ItemRepository {
  constructor(
    private itemDataSource: ItemDataSource,
    private itemCategoriesDataSource: ItemCategoryDataSource
  ) {}

  async getAllItems(): Promise<ItemWithoutStock[] | null> {
    const items = await this.itemDataSource.findAll();

    const mappedItems: ItemWithoutStock[] = items.map((item) => {
      const id = new Id(item.id);
      const name = new Name(item.name);
      const categoryId = new CategoryId(item.categoryId);
      const price = new Price(item.price);
      const supplierId = new SupplierId(item.supplierId);

      return {
        id,
        name,
        categoryId,
        price,
        supplierId,
      };
    });

    return mappedItems;
  }

  async getItemById(id: Id): Promise<ItemWithoutStock | null> {
    const item = await this.itemDataSource.findById(id.id);

    const itemId = new Id(item.id);
    const name = new Name(item.name);
    const categoryId = new CategoryId(item.categoryId);
    const price = new Price(item.price);
    const supplierId = new SupplierId(item.supplierId);

    return {
      id: itemId,
      name,
      categoryId,
      price,
      supplierId,
    };
  }

  async createItem(item: ParamsForItemCreation): Promise<ItemWithoutStock> {
    const createdItem = await this.itemDataSource.create({
      name: item.name.name,
      categoryId: item.categoryId.categoryId,
      price: item.price.price,
      supplierId: item.supplierId.supplierId,
    });

    const id = new Id(createdItem.id);
    const name = new Name(createdItem.name);
    const categoryId = new CategoryId(createdItem.categoryId);
    const price = new Price(createdItem.price);
    const supplierId = new SupplierId(createdItem.supplierId);

    return {
      id,
      name,
      categoryId,
      price,
      supplierId,
    };
  }

  async updateItem(item: ItemWithoutStock): Promise<ItemWithoutStock> {
    const updatedItem = await this.itemDataSource.update({
      id: item.id.id,
      name: item.name.name,
      categoryId: item.categoryId.categoryId,
      price: item.price.price,
      supplierId: item.supplierId.supplierId,
    });

    const id = new Id(updatedItem.id);
    const name = new Name(updatedItem.name);
    const categoryId = new CategoryId(updatedItem.categoryId);
    const price = new Price(updatedItem.price);
    const supplierId = new SupplierId(updatedItem.supplierId);

    return {
      id,
      name,
      categoryId,
      price,
      supplierId,
    };
  }

  async removeItem(id: Id): Promise<ItemWithoutStock> {
    const removedItem = await this.itemDataSource.remove(id.id);

    const itemId = new Id(removedItem.id);
    const name = new Name(removedItem.name);
    const categoryId = new CategoryId(removedItem.categoryId);
    const price = new Price(removedItem.price);
    const supplierId = new SupplierId(removedItem.supplierId);

    return {
      id: itemId,
      name,
      categoryId,
      price,
      supplierId,
    };
  }

  async getAllStocks(): Promise<StockByCategory[] | null> {
    const items = await this.itemDataSource.findAll();
    const categories = await this.itemCategoriesDataSource.findAll();

    let stockGroups: StockByCategory[] = [];

    for (const category of categories) {
      const relatedItems = items.filter((item) => {
        return item.categoryId === category.id;
      });

      const mappedItems: Item[] = relatedItems.map((item) => {
        const id = new Id(item.id);
        const name = new Name(item.name);
        const categoryId = new CategoryId(item.categoryId);
        const price = new Price(item.price);
        const supplierId = new SupplierId(item.supplierId);
        const stockQuantity = new StockQuantity(item.stockQuantity);

        return new Item(id, name, categoryId, price, supplierId, stockQuantity);
      });

      stockGroups.push({
        items: mappedItems,
        category: category.name,
      });
    }

    return stockGroups;
  }

  async getStockById(id: Id): Promise<Item | null> {
    const item = await this.itemDataSource.findById(id.id);

    const itemId = new Id(item.id);
    const name = new Name(item.name);
    const categoryId = new CategoryId(item.categoryId);
    const price = new Price(item.price);
    const supplierId = new SupplierId(item.supplierId);
    const stockQuantity = new StockQuantity(item.stockQuantity);

    return new Item(itemId, name, categoryId, price, supplierId, stockQuantity);
  }

  async addStock(id: Id, stockQuantity: StockQuantity): Promise<Item> {
    const item = await this.itemDataSource.findById(id.id);

    const currentStock = item.stockQuantity;
    const newStockQuantity = currentStock + stockQuantity.stockQuantity;

    const updatedItem = await this.itemDataSource.updateStock(
      item.id,
      newStockQuantity
    );

    const itemId = new Id(updatedItem.id);
    const name = new Name(updatedItem.name);
    const categoryId = new CategoryId(updatedItem.categoryId);
    const price = new Price(updatedItem.price);
    const supplierId = new SupplierId(updatedItem.supplierId);
    const itemStockQuantity = new StockQuantity(updatedItem.stockQuantity);

    return new Item(
      itemId,
      name,
      categoryId,
      price,
      supplierId,
      itemStockQuantity
    );
  }

  async removeStock(id: Id, stockQuantity: StockQuantity): Promise<Item> {
    const item = await this.itemDataSource.findById(id.id);

    const currentStock = item.stockQuantity;
    const newStockQuantity = currentStock - stockQuantity.stockQuantity;

    const updatedItem = await this.itemDataSource.updateStock(
      item.id,
      newStockQuantity
    );

    const itemId = new Id(updatedItem.id);
    const name = new Name(updatedItem.name);
    const categoryId = new CategoryId(updatedItem.categoryId);
    const price = new Price(updatedItem.price);
    const supplierId = new SupplierId(updatedItem.supplierId);
    const itemStockQuantity = new StockQuantity(updatedItem.stockQuantity);

    return new Item(
      itemId,
      name,
      categoryId,
      price,
      supplierId,
      itemStockQuantity
    );
  }
}
