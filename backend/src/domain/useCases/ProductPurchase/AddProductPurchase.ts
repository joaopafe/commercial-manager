import { ProductPurchaseRepository } from "../../repositories/ProductPurchaseRepository";
import { SupplierRepository } from "../../repositories/SupplierRepository";
import { ItemRepository } from "../../repositories/ItemRepository";

import {
  SupplierId,
  ItemId,
  Quantity,
  Value,
  PurchaseDate,
  ProductPurchase,
} from "../../entities/ProductPurchase";
import { Id } from "../../entities/shared/Id";

import { ProductPurchaseError } from "../../entities/errors/ProductPurchaseError";

export interface AddProductPurchaseParams {
  supplierId: number;
  itemId: number;
  quantity: number;
  value: number;
  date: Date;
}

export class AddProductPurchase {
  constructor(
    private productPurchaseRepository: ProductPurchaseRepository,
    private supplierRepository: SupplierRepository,
    private itemRepository: ItemRepository
  ) {}

  async exec(productPurchase: AddProductPurchaseParams) {
    const supplierExists = await this.supplierRepository.getSupplierById(
      new Id(productPurchase.supplierId)
    );
    if (!supplierExists)
      throw new ProductPurchaseError(
        "supplier_id_is_invalid",
        "The supplier id does not exist"
      );
    const supplierId = new SupplierId(productPurchase.supplierId);

    const itemExists = await this.itemRepository.getItemById(
      new Id(productPurchase.itemId)
    );
    if (!itemExists)
      throw new ProductPurchaseError(
        "item_id_is_invalid",
        "The item id does not exist"
      );
    const itemId = new ItemId(productPurchase.itemId);

    const quantity = new Quantity(productPurchase.quantity);
    const value = new Value(productPurchase.value);
    const date = new PurchaseDate(productPurchase.date);

    return await this.productPurchaseRepository.createProductPurchase({
      supplierId,
      itemId,
      quantity,
      value,
      date,
    });
  }
}
