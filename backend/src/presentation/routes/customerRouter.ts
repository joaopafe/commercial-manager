import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { CustomerControllerFactory } from "../../providers/di/CustomerControllerFactory";

import { CustomerDataSourceImpl } from "../../data/dataSources/CustomerDataSourceImpl";

export const customerRouter = Router();

const customerControllerFactory = new CustomerControllerFactory();
const customerController = customerControllerFactory.makeCustomerController();

const customerDataSource = new CustomerDataSourceImpl();

customerDataSource.createTable();

customerRouter.get("/", customerController.getAll.bind(customerController));

customerRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      cpf: Joi.string().min(11).required(),
      name: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).required(),
    }),
  }),
  customerController.add.bind(customerController),
);

customerRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      cpf: Joi.string().min(11).required(),
      name: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).required(),
    }),
  }),
  customerController.update.bind(customerController),
);

customerRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().positive().required(),
    }),
  }),
  customerController.remove.bind(customerController),
);
