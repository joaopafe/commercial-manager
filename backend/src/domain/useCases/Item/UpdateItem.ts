import { ItemRepository } from "../../repositories/ItemRepository";
import { ItemCategoryRepository } from "../../repositories/ItemCategoryRepository";
import { SupplierRepository } from "../../repositories/SupplierRepository";

import { Name, CategoryId, Price, SupplierId } from "../../entities/Item";
import { Id } from "../../entities/shared/Id";

import { DomainError } from "../../entities/errors/DomainError";

import { AddItemParams } from "./CreateItem";

export interface UpdateItemParams extends AddItemParams {
  id: number;
}

export class UpdateItem {
  constructor(
    private itemRepository: ItemRepository,
    private itemCategoryRepository: ItemCategoryRepository,
    private supplierRepository: SupplierRepository
  ) {}

  async exec(item: UpdateItemParams) {
    // Verify if the item id exists:
    const itemExists = this.itemRepository.getItemById(new Id(item.id));
    if (!itemExists) {
      throw new DomainError("invalid_value", "The item id does not exist");
    }
    const id = new Id(item.id);

    const name = new Name(item.name);

    // Verify if the category id exists:
    const categoryIdExists = this.itemCategoryRepository.getItemCategoryById(
      new Id(item.categoryId)
    );
    if (!categoryIdExists)
      throw new DomainError("invalid_value", "The category id does not exist");
    const categoryId = new CategoryId(item.categoryId);

    const price = new Price(item.price);

    // Verify if the supplier id exists:
    const supplierExists = this.supplierRepository.getSupplierById(
      new Id(item.supplierId)
    );
    if (!supplierExists)
      throw new DomainError("invalid_value", "The supplier id does not exist");
    const supplierId = new SupplierId(item.supplierId);

    const editedItem = await this.itemRepository.updateItem({
      id,
      name,
      categoryId,
      price,
      supplierId,
    });

    return editedItem;
  }
}
