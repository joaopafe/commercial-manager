import { ItemRepository } from "../repositories/ItemRepository";

import { Item, StockQuantity } from "../entities/Item";
import { Id } from "../entities/shared/Id";

import { DomainError } from "../entities/errors/DomainError";

export interface RemoveStockParams {
  id: number;
  quantity: number;
}

export class RemoveStock {
  constructor(private itemRepository: ItemRepository) {}

  async exec(item: RemoveStockParams) {
    const itemExists = await this.itemRepository.getStockById(new Id(item.id));
    if (!itemExists)
      throw new DomainError("invalid_value", "The item id does not exist");
    const id = new Id(item.id);

    const currentStock = this.itemRepository.getStockById(id);

    if (!currentStock)
      throw new DomainError("invalid_value", "The item id does not exist");
    if (currentStock instanceof Item) {
      if (currentStock.stockQuantity > item.quantity) {
        throw new DomainError(
          "invalid_value",
          `The quantity is invalid. The quantity in stock of item ${currentStock.name} is ${currentStock.stockQuantity}`
        );
      }
    }
    const stockQuantity = new StockQuantity(item.quantity);

    await this.itemRepository.removeStock(id, stockQuantity);

    const updatedItem = await this.itemRepository.getItemById(id);

    if (!updatedItem)
      throw new DomainError("invalid_value", "The item does not exist");

    return updatedItem;
  }
}
