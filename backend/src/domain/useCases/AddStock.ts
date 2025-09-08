import { ItemRepository } from "../repositories/ItemRepository";

import { Id } from "../entities/shared/Id";
import { StockQuantity } from "../entities/Item";

import { DomainError } from "../entities/errors/DomainError";

export interface AddStockParams {
  id: number;
  quantity: number;
}

export class AddStock {
  constructor(private itemRepository: ItemRepository) {}

  async exec(item: AddStockParams) {
    const itemExists = await this.itemRepository.getItemById(new Id(item.id));
    if (!itemExists)
      throw new DomainError("invalid_value", "The item id does not exist");
    const id = new Id(item.id);

    const stockQuantity = new StockQuantity(item.quantity);

    await this.itemRepository.addStock(id, stockQuantity);

    const updatedItem = await this.itemRepository.getItemById(id);

    if (!updatedItem)
      throw new DomainError(
        "invalid_value",
        "It was not possible to get the item"
      );

    return updatedItem;
  }
}
