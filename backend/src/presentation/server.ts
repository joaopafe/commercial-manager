import * as dotenv from "dotenv";

import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";

// import * as swaggerDocument from "./swagger.json";

import { errorMiddleware } from "./middlewares/errorMiddleware";

import { customerRouter } from "./routes/customerRouter";
import { itemCategoryRouter } from "./routes/itemCategoryRouter";
import { itemRouter } from "./routes/itemRouter";
import { productPurchaseRouter } from "./routes/productPurchaseRouter";
import { productSaleRouter } from "./routes/productSaleRouter";
import { servicePurchaseRouter } from "./routes/servicePurchaseRouter";
import { serviceSaleRouter } from "./routes/serviceSaleRouter";
import { supplierRouter } from "./routes/supplierRouter";

const app = express();
app.disable("x-powered-by");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes:
app.use("/customer", customerRouter);
app.use("/item-category", itemCategoryRouter);
app.use("/item", itemRouter);
app.use("/product-purchase", productSaleRouter);
app.use("/product-sale", productSaleRouter);
app.use("/service-purchase", servicePurchaseRouter);
app.use("/service-sale", serviceSaleRouter);
app.use("/supplier", supplierRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
