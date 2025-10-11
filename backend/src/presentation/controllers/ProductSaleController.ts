import { Request, Response } from "express";

import { GetAllProductSales } from "../../domain/useCases/ProductSale/GetAllProductSales";
import { GetProductSaleById } from "../../domain/useCases/ProductSale/GetProductSaleById";
import { AddProductSale } from "../../domain/useCases/ProductSale/AddProductSale";
import { UpdateProductSale } from "../../domain/useCases/ProductSale/UpdateProductSale";
import { RemoveProductSale } from "../../domain/useCases/ProductSale/RemoveProductSale";
import { AddStock } from "../../domain/useCases/Item/AddStock";
import { RemoveStock } from "../../domain/useCases/Item/RemoveStock";

export class ProductSaleController {
  constructor(
    private getAllProductSalesUseCase: GetAllProductSales,
    private getProductSaleByIdUseCase: GetProductSaleById,
    private addProductSaleUseCase: AddProductSale,
    private updateProductSaleUseCase: UpdateProductSale,
    private removeProductSaleUseCase: RemoveProductSale,
    private addStockUseCase: AddStock,
    private removeStockUseCase: RemoveStock
  ) {}

  async getAll(req: Request, res: Response) {
    const productSales = await this.getAllProductSalesUseCase.exec();

    res.json(productSales);
  }

  async add(req: Request, res: Response) {
    const newProductSale = await this.addProductSaleUseCase.exec({
      customerId: req.body.customerId,
      itemId: req.body.itemId,
      quantity: req.body.quantity,
      value: req.body.value,
      date: new Date(req.body.date),
    });

    await this.removeStockUseCase.exec({
      id: newProductSale.itemId,
      quantity: newProductSale.quantity,
    });

    res.status(201).json(newProductSale);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const currentProductSale = await this.getProductSaleByIdUseCase.exec(id);

    const updatedProductSale = await this.updateProductSaleUseCase.exec({
      id,
      customerId: req.body.customerId,
      itemId: req.body.itemId,
      quantity: req.body.quantity,
      value: req.body.value,
      date: new Date(req.body.date),
    });

    if (currentProductSale === null) {
      res.status(404).json({ error: "The product sale does not exist" });
    } else {
      if (currentProductSale.quantity < updatedProductSale.quantity) {
        await this.removeStockUseCase.exec({
          id: updatedProductSale.itemId,
          quantity: updatedProductSale.quantity - currentProductSale.quantity,
        });
      }

      await this.addStockUseCase.exec({
        id: updatedProductSale.itemId,
        quantity: currentProductSale.quantity - updatedProductSale.quantity,
      });
    }

    res.status(200).json(updatedProductSale);
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const removedProductSale = await this.removeProductSaleUseCase.exec(id);

    await this.addStockUseCase.exec({
      id,
      quantity: removedProductSale.quantity,
    });

    res.status(204).json(removedProductSale);
  }
}
