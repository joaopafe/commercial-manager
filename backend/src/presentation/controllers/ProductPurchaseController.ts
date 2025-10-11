import { Request, Response } from "express";

import { GetAllProductPurchases } from "../../domain/useCases/ProductPurchase/GetAllProductPurchases";
import { GetProductPurchaseById } from "../../domain/useCases/ProductPurchase/GetProductPurchaseById";
import { AddProductPurchase } from "../../domain/useCases/ProductPurchase/AddProductPurchase";
import { UpdateProductPurchase } from "../../domain/useCases/ProductPurchase/UpdateProductPurchase";
import { RemoveProductPurchase } from "../../domain/useCases/ProductPurchase/RemoveProductPurchase";
import { AddStock } from "../../domain/useCases/Item/AddStock";
import { RemoveStock } from "../../domain/useCases/Item/RemoveStock";

export class ProductPurchaseController {
  constructor(
    private getAllProductPurchasesUseCase: GetAllProductPurchases,
    private getProductPurchaseByIdUseCase: GetProductPurchaseById,
    private addProductPurchaseUseCase: AddProductPurchase,
    private updateProductPurchaseUseCase: UpdateProductPurchase,
    private removeProductPurchaseUseCase: RemoveProductPurchase,
    private addStockUseCase: AddStock,
    private removeStockUseCase: RemoveStock
  ) {}

  async getAll(req: Request, res: Response) {
    const productPurchases = await this.getAllProductPurchasesUseCase.exec();

    res.json(productPurchases);
  }

  async add(req: Request, res: Response) {
    const newProductPurchase = await this.addProductPurchaseUseCase.exec({
      supplierId: req.body.supplierId,
      itemId: req.body.itemId,
      quantity: req.body.quantity,
      value: req.body.value,
      date: new Date(req.body.date),
    });

    await this.addStockUseCase.exec({
      id: newProductPurchase.itemId,
      quantity: newProductPurchase.quantity,
    });

    res.status(201).json(newProductPurchase.toObject());
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const currentProductPurchase =
      await this.getProductPurchaseByIdUseCase.exec(id);

    const updatedProductPurchase = await this.updateProductPurchaseUseCase.exec(
      {
        id,
        supplierId: req.body.supplierId,
        itemId: req.body.itemId,
        quantity: req.body.quantity,
        value: req.body.value,
        date: new Date(req.body.date),
      }
    );

    if (currentProductPurchase === null) {
      res.status(404).json({ error: "The product purchase does not exist" });
    } else {
      if (currentProductPurchase.quantity < updatedProductPurchase.quantity) {
        await this.addStockUseCase.exec({
          id: updatedProductPurchase.itemId,
          quantity:
            updatedProductPurchase.quantity - currentProductPurchase.quantity,
        });
      }

      await this.removeStockUseCase.exec({
        id: updatedProductPurchase.itemId,
        quantity:
          currentProductPurchase.quantity - updatedProductPurchase.quantity,
      });
    }

    res.status(200).json(updatedProductPurchase.toObject());
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const removedProductPurchase = await this.removeProductPurchaseUseCase.exec(
      id
    );

    await this.removeStockUseCase.exec({
      id: removedProductPurchase.itemId,
      quantity: removedProductPurchase.quantity,
    });

    res.status(204).json(removedProductPurchase.toObject());
  }
}
