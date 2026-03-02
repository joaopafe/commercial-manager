import { Request, Response } from "express";

import { GetAllCustomers } from "../../domain/useCases/Customer/GetAllCustomers";
import { AddCustomer } from "../../domain/useCases/Customer/AddCustomer";
import { UpdateCustomer } from "../../domain/useCases/Customer/UpdateCustomer";
import { RemoveCustomer } from "../../domain/useCases/Customer/RemoveCustomer";

export class CustomerController {
  constructor(
    private getAllCustomersUseCase: GetAllCustomers,
    private addCustomerUseCase: AddCustomer,
    private updateCustomerUseCase: UpdateCustomer,
    private removeCustomerUseCase: RemoveCustomer,
  ) {}

  async getAll(req: Request, res: Response) {
    const customers = await this.getAllCustomersUseCase.exec();

    const formattedCustomers = customers.map((customer) => {
      return customer.toObject();
    });

    res.json(formattedCustomers);
  }

  async add(req: Request, res: Response) {
    const newCustomer = await this.addCustomerUseCase.exec({
      cpf: req.body.cpf,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    res.status(201).json(newCustomer.toObject());
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const updatedCustomer = await this.updateCustomerUseCase.exec({
      id,
      cpf: req.body.cpf,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    res.status(200).json(updatedCustomer.toObject());
  }

  async remove(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    if (isNaN(id)) return res.status(400).json({ error: "Id is invalid" });

    const removedCustomer = await this.removeCustomerUseCase.exec(id);

    res.status(204).json(removedCustomer.toObject());
  }
}
