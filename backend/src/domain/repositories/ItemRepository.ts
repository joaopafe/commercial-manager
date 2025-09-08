import { Id } from "../entities/shared/Id";

import {
  Name,
  CategoryId,
  Price,
  SupplierId,
  StockQuantity,
  Item,
} from "../entities/Item";

export interface ItemWithoutStock {
  id: Id;
  name: Name;
  categoryId: CategoryId;
  price: Price;
  supplierId: SupplierId;
}

export type ParamsForItemCreation = Omit<ItemWithoutStock, "id">;

interface StockByCategory {
  items: Item[];
  category: string;
}

export interface ItemRepository {
  getAllItems(): Promise<ItemWithoutStock[] | null>;
  getItemById(id: Id): Promise<ItemWithoutStock | null>;
  createItem(item: ParamsForItemCreation): Promise<ItemWithoutStock>;
  updateItem(item: ItemWithoutStock): Promise<ItemWithoutStock>;
  removeItem(id: Id): Promise<ItemWithoutStock>;
  getAllStocks(): Promise<StockByCategory[] | null>;
  getStockById(id: Id): Promise<Item | null>;
  addStock(id: Id, stockQuantity: StockQuantity): Promise<Item>;
  removeStock(id: Id, stockQuantity: StockQuantity): Promise<Item>;
}
