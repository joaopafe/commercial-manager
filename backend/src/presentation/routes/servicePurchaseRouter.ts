import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { ServicePurchaseControllerFactory } from "../../providers/di/ServicePurchaseControllerFactory";

export const servicePurchaseRouter = Router();

const servicePurchaseControllerFactory = new ServicePurchaseControllerFactory();
const servicePurchaseController =
  servicePurchaseControllerFactory.makeServicePurchaseController();

servicePurchaseRouter.get("/", servicePurchaseController.getAll);

servicePurchaseRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      supplierId: Joi.number().positive().required(),
      name: Joi.string().min(3).required(),
      value: Joi.number().positive().required(),
      date: Joi.string().min(10).max(10),
    }),
  }),
  servicePurchaseController.add
);

servicePurchaseRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      supplierId: Joi.number().positive().required(),
      name: Joi.string().min(3).required(),
      value: Joi.number().positive().required(),
      date: Joi.string().min(10).max(10),
    }),
  }),
  servicePurchaseController.update
);

servicePurchaseRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  servicePurchaseController.remove
);
