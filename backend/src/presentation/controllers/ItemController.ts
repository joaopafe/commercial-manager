import { Request, Response } from "express";

import { GetAllItems } from "../../domain/useCases/Item/GetAllItems";
import { CreateItem } from "../../domain/useCases/Item/CreateItem";
import { UpdateItem } from "../../domain/useCases/Item/UpdateItem";
import { RemoveItem } from "../../domain/useCases/Item/RemoveItem";
import { GetItemStocks } from "../../domain/useCases/Item/GetItemStocks";

export class ItemController {
  constructor(
    private getAllItemsUseCase: GetAllItems,
    private createItemUseCase: CreateItem,
    private updateItemUseCase: UpdateItem,
    private removeItemUseCase: RemoveItem,
    private getItemStocksUseCase: GetItemStocks
  ) {}

  async getAll(req: Request, res: Response) {
    const items = await this.getAllItemsUseCase.exec();

    res.json(items);
  }

  async create(req: Request, res: Response) {
    const newItem = await this.createItemUseCase.exec({
      name: req.body.name,
      categoryId: req.body.categoryId,
      price: req.body.price,
      supplierId: req.body.supplierId,
    });

    res.status(201).json(newItem);
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const updatedItem = await this.updateItemUseCase.exec({
      id,
      name: req.body.name,
      categoryId: req.body.categoryId,
      price: req.body.price,
      supplierId: req.body.supplierId,
    });
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const removedItem = await this.removeItemUseCase.exec(id);

    res.status(204).json(removedItem);
  }

  async getStocks(req: Request, res: Response) {
    const itemStocks = await this.getItemStocksUseCase.exec();

    res.json(itemStocks);
  }
}
