import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { ProductPurchaseControllerFactory } from "../../providers/di/ProductPurchaseControllerFactory";

export const productPurchaseRouter = Router();

const productPurchaseControllerFactory = new ProductPurchaseControllerFactory();
const productPurchaseController =
  productPurchaseControllerFactory.makeProductPurchaseController();

productPurchaseRouter.get("/", productPurchaseController.getAll);

productPurchaseRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      supplierId: Joi.number().positive().required(),
      itemId: Joi.number().positive().required(),
      quantity: Joi.number().positive().integer().required(),
      value: Joi.number().positive().required(),
      date: Joi.string().min(10).max(10).required(),
    }),
  }),
  productPurchaseController.add
);

productPurchaseRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      supplierId: Joi.number().positive().required(),
      itemId: Joi.number().positive().required(),
      quantity: Joi.number().positive().integer().required(),
      value: Joi.number().positive().required(),
      date: Joi.string().min(10).max(10).required(),
    }),
  }),
  productPurchaseController.update
);

productPurchaseRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  productPurchaseController.remove
);
