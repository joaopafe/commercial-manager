import { ItemRepository } from "../../repositories/ItemRepository";

export class GetItemStocks {
  constructor(private itemRepository: ItemRepository) {}

  async exec() {
    const itemStocks = await this.itemRepository.getAllStocks();

    return itemStocks;
  }
}
