import { ItemRepository } from "../../repositories/ItemRepository";

import { Id } from "../../entities/shared/Id";

import { ItemError } from "../../entities/errors/ItemError";

export class RemoveItem {
  constructor(private itemRepository: ItemRepository) {}

  async exec(id: number) {
    const itemExists = await this.itemRepository.getItemById(new Id(id));

    if (!itemExists)
      throw new ItemError("item_not_found", "The item id does not exist");

    const itemId = new Id(id);

    return this.itemRepository.removeItem(itemId);
  }
}
