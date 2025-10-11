import { Request, Response } from "express";

import { GetAllServicePurchases } from "../../domain/useCases/ServicePurchase/GetAllServicePurchases";
import { AddServicePurchase } from "../../domain/useCases/ServicePurchase/AddServicePurchase";
import { UpdateServicePurchase } from "../../domain/useCases/ServicePurchase/UpdateServicePurchase";
import { RemoveServicePurchase } from "../../domain/useCases/ServicePurchase/RemoveServicePurchase";

export class ServicePurchaseController {
  constructor(
    private getAllServicePurchasesUseCase: GetAllServicePurchases,
    private addServicePurchaseUseCase: AddServicePurchase,
    private updateServicePurchaseUseCase: UpdateServicePurchase,
    private removeServicePurchaseUseCase: RemoveServicePurchase
  ) {}

  async getAll(req: Request, res: Response) {
    const servicePurchases = await this.getAllServicePurchasesUseCase.exec();

    res.json(servicePurchases);
  }

  async add(req: Request, res: Response) {
    const newServicePurchase = await this.addServicePurchaseUseCase.exec({
      supplierId: req.body.supplierId,
      name: req.body.name,
      value: req.body.value,
      date: new Date(req.body.date),
    });

    res.status(201).json(newServicePurchase.toObject());
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const updatedServicePurchase = await this.updateServicePurchaseUseCase.exec(
      {
        id,
        supplierId: req.body.supplierId,
        name: req.body.name,
        value: req.body.value,
        date: new Date(req.body.date),
      }
    );

    res.status(200).json(updatedServicePurchase.toObject());
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const removedServicePurchase = await this.removeServicePurchaseUseCase.exec(
      id
    );

    res.status(201).json(removedServicePurchase.toObject());
  }
}
