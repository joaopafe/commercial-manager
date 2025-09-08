import { ItemRepository } from "../../repositories/ItemRepository";

import { DomainError } from "../../entities/errors/DomainError";

export class GetItemStocks {
  constructor(private itemRepository: ItemRepository) {}

  async exec() {
    const itemStocks = await this.itemRepository.getAllStocks();

    if (itemStocks === null)
      throw new DomainError(
        "unknown",
        "It was not possible to get the item stocks"
      );

    return itemStocks;
  }
}
