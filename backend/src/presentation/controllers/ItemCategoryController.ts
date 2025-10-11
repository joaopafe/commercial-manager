import { Request, Response } from "express";

import { GetAllItemCategories } from "../../domain/useCases/ItemCategory/GetAllItemCategories";
import { CreateItemCategory } from "../../domain/useCases/ItemCategory/CreateItemCategory";
import { RemoveItemCategory } from "../../domain/useCases/ItemCategory/RemoveItemCategory";

export class ItemCategoryController {
  constructor(
    private getAllItemCategories: GetAllItemCategories,
    private createItemCategory: CreateItemCategory,
    private removeItemCategory: RemoveItemCategory
  ) {}

  async getAll(req: Request, res: Response) {
    const itemCategories = await this.getAllItemCategories.exec();

    res.json(itemCategories);
  }

  async create(req: Request, res: Response) {
    const newItemCategory = await this.createItemCategory.exec(
      req.body.description
    );

    res.status(201).json(newItemCategory.toObject());
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const removedItemCategory = await this.removeItemCategory.exec(id);

    res.status(204).json(removedItemCategory.toObject());
  }
}
