import { ItemCategoryRepository } from "../../repositories/ItemCategoryRepository";

import { Id } from "../../entities/shared/Id";

import { CategoryError } from "../../entities/errors/CategoryError";

export class RemoveItemCategory {
  constructor(private itemCategoryRepository: ItemCategoryRepository) {}

  async exec(id: number) {
    const itemCategoryExists =
      await this.itemCategoryRepository.getItemCategoryById(new Id(id));
    if (!itemCategoryExists)
      throw new CategoryError(
        "category_not_found",
        "The item category id does not exist"
      );

    const itemCategory = await this.itemCategoryRepository.removeItemCategory(
      new Id(id)
    );

    return itemCategory;
  }
}
