import { ItemCategoryRepository } from "../../repositories/ItemCategoryRepository";

import { DomainError } from "../../entities/errors/DomainError";

export class GetAllItemCategories {
  constructor(private itemCategoryRepository: ItemCategoryRepository) {}

  async exec() {
    const itemCategories =
      await this.itemCategoryRepository.getAllItemCategories();

    if (itemCategories === null)
      throw new DomainError(
        "unknown",
        "It was not possible to get the item categories"
      );

    return itemCategories;
  }
}
