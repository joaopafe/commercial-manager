import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { ItemCategoryControllerFactory } from "../../providers/di/ItemCategoryControllerFactory";

export const itemCategoryRouter = Router();

const itemCategoryControllerFactory = new ItemCategoryControllerFactory();
const itemCategoryController =
  itemCategoryControllerFactory.makeItemCategoryController();

itemCategoryRouter.get("/", itemCategoryController.getAll);

itemCategoryRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      description: Joi.string().min(3).required(),
    }),
  }),
  itemCategoryController.create
);

itemCategoryRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  itemCategoryController.remove
);
