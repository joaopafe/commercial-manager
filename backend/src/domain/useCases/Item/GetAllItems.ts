import { ItemRepository } from "../../repositories/ItemRepository";

import { DomainError } from "../../entities/errors/DomainError";

export class GetAllItems {
  constructor(private itemRepository: ItemRepository) {}

  async exec() {
    const items = await this.itemRepository.getAllItems();

    if (items === null)
      throw new DomainError("unknown", "It was not possible to get the items");

    return items;
  }
}
