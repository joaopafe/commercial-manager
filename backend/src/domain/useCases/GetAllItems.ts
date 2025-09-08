import { ItemRepository } from "../repositories/ItemRepository";

export class GetAllItems {
  constructor(private itemRepository: ItemRepository) {}

  async exec() {
    const items = await this.itemRepository.getAllItems();

    return items;
  }
}
