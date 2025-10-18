import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { SupplierControllerFactory } from "../../providers/di/SupplierControllerFactory";

export const supplierRouter = Router();

const supplierControllerFactory = new SupplierControllerFactory();
const supplierController = supplierControllerFactory.makeSupplierController();

supplierRouter.get("/", supplierController.getAll);

supplierRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      cnpj: Joi.string().min(14).required(),
      name: Joi.string().min(2).required(),
      phone: Joi.string().min(10).required(),
    }),
  }),
  supplierController.add
);

supplierRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      cnpj: Joi.string().min(14).required(),
      name: Joi.string().min(2).required(),
      phone: Joi.string().min(10).required(),
    }),
  }),
  supplierController.update
);

supplierRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  supplierController.remove
);
