import { Request, Response } from "express";

import { GetAllServiceSales } from "../../domain/useCases/ServiceSale/GetAllServiceSales";
import { AddServiceSale } from "../../domain/useCases/ServiceSale/AddServiceSale";
import { UpdateServiceSale } from "../../domain/useCases/ServiceSale/UpdateServiceSale";
import { RemoveServiceSale } from "../../domain/useCases/ServiceSale/RemoveServiceSale";

export class ServicePurchaseController {
  constructor(
    private getAllServiceSalesUseCase: GetAllServiceSales,
    private addServiceSaleUseCase: AddServiceSale,
    private updateServiceSaleUseCase: UpdateServiceSale,
    private removeServiceSaleUseCase: RemoveServiceSale
  ) {}

  async getAll(req: Request, res: Response) {
    const serviceSales = await this.getAllServiceSalesUseCase.exec();

    res.json(serviceSales);
  }

  async add(req: Request, res: Response) {
    const newServiceSale = await this.addServiceSaleUseCase.exec({
      customerId: req.body.customerId,
      name: req.body.name,
      value: req.body.value,
      date: new Date(req.body.date),
    });

    res.status(201).json(newServiceSale.toObject());
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const updatedServiceSale = await this.updateServiceSaleUseCase.exec({
      id,
      customerId: req.body.customerId,
      name: req.body.name,
      value: req.body.value,
      date: new Date(req.body.date),
    });

    res.status(200).json(updatedServiceSale.toObject());
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const removedServiceSale = await this.removeServiceSaleUseCase.exec(id);

    res.status(204).json(removedServiceSale.toObject());
  }
}
