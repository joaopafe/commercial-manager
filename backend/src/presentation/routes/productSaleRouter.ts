import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { ProductSaleControllerFactory } from "../../providers/di/ProductSaleControllerFactory";

export const productSaleRouter = Router();

const productSaleControllerFactory = new ProductSaleControllerFactory();
const productSaleController =
  productSaleControllerFactory.makeProductSaleController();

productSaleRouter.get("/", productSaleController.getAll);

productSaleRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.number().positive().required(),
      itemId: Joi.number().positive().required(),
      quantity: Joi.number().positive().integer().required(),
      value: Joi.number().positive().required(),
      date: Joi.string().min(10).max(10),
    }),
  })
);

productSaleRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      customerId: Joi.number().positive().required(),
      itemId: Joi.number().positive().required(),
      quantity: Joi.number().positive().integer().required(),
      value: Joi.number().positive().required(),
      date: Joi.string().min(10).max(10),
    }),
  }),
  productSaleController.update
);

productSaleRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  productSaleController.remove
);
