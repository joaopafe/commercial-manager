import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { ServiceSaleControllerFactory } from "../../providers/di/ServiceSaleControllerFactory";

export const serviceSaleRouter = Router();

const serviceSaleControllerFactory = new ServiceSaleControllerFactory();
const serviceSaleController =
  serviceSaleControllerFactory.makeServiceSaleController();

serviceSaleRouter.get("/", serviceSaleController.getAll);

serviceSaleRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.number().positive().required(),
      name: Joi.string().min(3).required(),
      value: Joi.number().positive().required(),
      date: Joi.string().min(10).max(10),
    }),
  }),
  serviceSaleController.add
);

serviceSaleRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.number().positive().required(),
      name: Joi.string().min(3).required(),
      value: Joi.number().positive().required(),
      date: Joi.string().min(10).max(10),
    }),
  }),
  serviceSaleController.update
);

serviceSaleRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  serviceSaleController.remove
);
