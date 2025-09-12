import { ProductSaleRepository } from "../../repositories/ProductSaleRepository";
import { CustomerRepository } from "../../repositories/CustomerRepository";
import { ItemRepository } from "../../repositories/ItemRepository";

import {
  CustomerId,
  ItemId,
  Quantity,
  Value,
  SaleDate,
  ProductSale,
} from "../../entities/ProductSale";
import { Id } from "../../entities/shared/Id";

import { ProductSaleError } from "../../entities/errors/ProductSaleError";

import { AddProductSaleParams } from "./AddProductSale";

export interface UpdateProductSaleParams extends AddProductSaleParams {
  id: number;
}

export class UpdateProductSale {
  constructor(
    private productSaleRepository: ProductSaleRepository,
    private customerRepository: CustomerRepository,
    private itemRepository: ItemRepository
  ) {}

  async exec(productSale: UpdateProductSaleParams) {
    const productSaleExists =
      await this.productSaleRepository.getProductSaleById(
        new Id(productSale.id)
      );
    if (!productSaleExists)
      throw new ProductSaleError(
        "product_sale_not_found",
        "The product sale id does not exist"
      );
    const id = new Id(productSale.id);

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

    return await this.productSaleRepository.updateProductSale(
      new ProductSale(id, customerId, itemId, quantity, value, date)
    );
  }
}
