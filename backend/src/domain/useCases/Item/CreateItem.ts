import { ItemRepository } from "../../repositories/ItemRepository";
import { ItemCategoryRepository } from "../../repositories/ItemCategoryRepository";
import { SupplierRepository } from "../../repositories/SupplierRepository";

import { Name, CategoryId, Price, SupplierId } from "../../entities/Item";
import { Id } from "../../entities/shared/Id";

import { ItemError } from "../../entities/errors/ItemError";

export interface AddItemParams {
  name: string;
  categoryId: number;
  price: number;
  supplierId: number;
}

export class CreateItem {
  constructor(
    private itemRepository: ItemRepository,
    private itemCategoryRepository: ItemCategoryRepository,
    private supplierRepository: SupplierRepository
  ) {}

  async exec(item: AddItemParams) {
    const name = new Name(item.name);

    // Verify if the category id exists:
    const categoryIdExists = this.itemCategoryRepository.getItemCategoryById(
      new Id(item.categoryId)
    );
    if (!categoryIdExists)
      throw new ItemError(
        "category_id_is_invalid",
        "The category id does not exist"
      );
    const categoryId = new CategoryId(item.categoryId);

    const price = new Price(item.price);

    // Verify if the supplier id exists:
    const supplierExists = this.supplierRepository.getSupplierById(
      new Id(item.supplierId)
    );
    if (!supplierExists)
      throw new ItemError(
        "supplier_id_is_invalid",
        "The supplier id does not exist"
      );
    const supplierId = new SupplierId(item.supplierId);

    const createdItem = await this.itemRepository.createItem({
      name,
      categoryId,
      price,
      supplierId,
    });

    return createdItem;
  }
}
