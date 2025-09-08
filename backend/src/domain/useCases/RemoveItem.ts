import { ItemRepository } from "../repositories/ItemRepository";

import { Id } from "../entities/shared/Id";

import { DomainError } from "../entities/errors/DomainError";

export class RemoveItem {
  constructor(private itemRepository: ItemRepository) {}

  async exec(id: number) {
    const itemExists = await this.itemRepository.getItemById(new Id(id));

    if (!itemExists)
      throw new DomainError("invalid_value", "The item id does not exist");

    const itemId = new Id(id);

    return this.itemRepository.removeItem(itemId);
  }
}
