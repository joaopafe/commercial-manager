import { ItemCategoryRepository } from "../../repositories/ItemCategoryRepository";

import { Name } from "../../entities/ItemCategory";

import { CategoryError } from "../../entities/errors/CategoryError";
import { DomainError } from "../../entities/errors/DomainError";

export class CreateItemCategory {
  constructor(private itemCategoryRepository: ItemCategoryRepository) {}

  async exec(name: string) {
    const categories = await this.itemCategoryRepository.getAllItemCategories();
    if (!categories)
      throw new DomainError(
        "unknown",
        "It was not possible to get the item categories"
      );
    if (categories) {
      let itemCategoryAlreadyExists: boolean = false;

      for (const itemCategory of categories) {
        if (itemCategory.name.toUpperCase === name.toUpperCase)
          itemCategoryAlreadyExists = true;
      }

      if (itemCategoryAlreadyExists)
        throw new CategoryError(
          "name_is_invalid",
          "The item category already exists"
        );
    }

    const itemCategory = await this.itemCategoryRepository.createItemCategory(
      new Name(name)
    );

    return itemCategory;
  }
}
