import { ProductSaleRepository } from "../../repositories/ProductSaleRepository";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { ItemRepository } from "../../repositories/ItemRepository";

import {
  CustomerId,
  ItemId,
  Quantity,
  Value,
  SaleDate,
} from "../../entities/ProductSale";
import { Id } from "../../entities/shared/Id";

import { ProductSaleError } from "../../entities/errors/ProductSaleError";

export interface AddProductSaleParams {
  customerId: number;
  itemId: number;
  quantity: number;
  value: number;
  date: Date;
}

export class AddProductSale {
  constructor(
    private productSaleRepository: ProductSaleRepository,
    private customerRepository: CustomerRepository,
    private itemRepository: ItemRepository
  ) {}

  async exec(productSale: AddProductSaleParams) {
    const customerExists = await this.customerRepository.getCustomerById(
      new Id(productSale.customerId)
    );
    if (!customerExists)
      throw new ProductSaleError(
        "customer_id_is_invalid",
        "The customer id does not exist"
      );
    const customerId = new CustomerId(productSale.customerId);

    const itemExists = await this.itemRepository.getItemById(
      new Id(productSale.itemId)
    );
    if (!itemExists)
      throw new ProductSaleError(
        "item_id_is_invalid",
        "The item id does not exist"
      );
    const itemId = new ItemId(productSale.itemId);

    const quantity = new Quantity(productSale.quantity);
    const value = new Value(productSale.value);
    const date = new SaleDate(productSale.date);

    return await this.productSaleRepository.createProductSale({
      customerId,
      itemId,
      quantity,
      value,
      date,
    });
  }
}
