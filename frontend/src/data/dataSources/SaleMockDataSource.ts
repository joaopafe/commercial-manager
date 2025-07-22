import { ServiceSale } from "../../domain/entities/ServiceSale";
import { ProductSale } from "../../domain/entities/ProductSale";

import { SaleDataSource } from "../repositories/SaleRepositoryImpl";

import { delay } from "../../shared/utils/delay";

const serviceSalesMock: ServiceSale[] = [
  {
    id: 1,
    clientId: 1,
    name: "Troca de óleo",
    value: 22.0,
    date: new Date("2025-07-13"),
  },
  {
    id: 2,
    clientId: 2,
    name: "Solda no radiador",
    value: 60.0,
    date: new Date("2025-07-15"),
  },
  {
    id: 3,
    clientId: 2,
    name: "Balanceamento de pneu",
    value: 50.0,
    date: new Date("2025-07-21"),
  },
  {
    id: 4,
    clientId: 3,
    name: "Alinhamento da suspensão",
    value: 50.0,
    date: new Date("2025-07-21"),
  },
  {
    id: 5,
    clientId: 3,
    name: "Limpeza de bico injetor",
    value: 120.0,
    date: new Date(),
  },
];

const productSalesMock: ProductSale[] = [
  {
    id: 1,
    clientId: 1,
    pieceId: 1,
    quantity: 1,
    value: 137.5,
    date: new Date("2025/07/13"),
  },
  {
    id: 2,
    clientId: 2,
    pieceId: 2,
    quantity: 2,
    value: 55.0,
    date: new Date("2025/07/15"),
  },
  {
    id: 3,
    clientId: 3,
    pieceId: 3,
    quantity: 4,
    value: 120.0,
    date: new Date("2025/07/17"),
  },
  {
    id: 4,
    clientId: 4,
    pieceId: 4,
    quantity: 1,
    value: 270.0,
    date: new Date(),
  },
  {
    id: 5,
    clientId: 4,
    pieceId: 3,
    quantity: 3,
    value: 90,
    date: new Date(),
  },
];

export class SaleMockDataSource implements SaleDataSource {
  async listServiceSales(): Promise<ServiceSale[] | null> {
    await delay(500);

    return serviceSalesMock;
    // return null;
  }

  async listProductSales(): Promise<ProductSale[] | null> {
    await delay(300);

    return productSalesMock;
    // return null
  }
}
