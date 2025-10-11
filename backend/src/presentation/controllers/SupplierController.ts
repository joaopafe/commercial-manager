import { Request, Response } from "express";

import { GetAllSuppliers } from "../../domain/useCases/Supplier/GetAllSuppliers";
import { AddSupplier } from "../../domain/useCases/Supplier/AddSupplier";
import { UpdateSupplier } from "../../domain/useCases/Supplier/UpdateSupplier";
import { RemoveSupplier } from "../../domain/useCases/Supplier/RemoveSupplier";

export class a {
  constructor(
    private getAllSuppliersUseCase: GetAllSuppliers,
    private addSupplierUseCase: AddSupplier,
    private updateSupplierUseCase: UpdateSupplier,
    private removeSupplierUseCase: RemoveSupplier
  ) {}

  async getAll(req: Request, res: Response) {
    const suppliers = await this.getAllSuppliersUseCase.exec();

    res.json(suppliers);
  }

  async add(req: Request, res: Response) {
    const newSupplier = await this.addSupplierUseCase.exec({
      cnpj: req.body.cnpj,
      name: req.body.name,
      phone: req.body.phone,
    });

    res.status(201).json(newSupplier.toObject());
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const updatedSupplier = await this.updateSupplierUseCase.exec({
      id,
      cnpj: req.body.cnpj,
      name: req.body.name,
      phone: req.body.phone,
    });

    res.status(200).json({ error: "Id is invalid" });
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(204).json({ error: "Id is invalid" });

    const removedSupplier = await this.removeSupplierUseCase.exec(id);

    res.status(204).json(removedSupplier.toObject());
  }
}
