import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { ItemControllerFactory } from "../../providers/di/ItemControllerFactory";

export const itemRouter = Router();

const itemControllerFactory = new ItemControllerFactory();
const itemController = itemControllerFactory.makeItemController();

itemRouter.get("/", itemController.getAll);

itemRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(3).required(),
      categoryId: Joi.number().positive().required(),
      price: Joi.number().positive().required(),
      supplierId: Joi.number().positive().required(),
    }),
  }),
  itemController.getAll
);

itemRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(3).required(),
      categoryId: Joi.number().positive().required(),
      price: Joi.number().positive().required(),
      supplierId: Joi.number().positive().required(),
    }),
  }),
  itemController.update
);

itemRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  itemController.remove
);

itemRouter.get("/stock", itemController.getStocks);
