import { ServicePurchase } from "../../domain/entities/ServicePurchase";
import { ProductPurchase } from "../../domain/entities/ProductPurchase";

import { PurchaseDataSource } from "../repositories/PurchaseRepositoryImpl";

import { delay } from "../../shared/utils/delay";

const servicePurchasesMock: ServicePurchase[] = [
  {
    id: 1,
    supplierId: 1,
    name: "Recondicionamento de radiador",
    value: 130,
    date: new Date("2025-07-20"),
  },
  {
    id: 2,
    supplierId: 7,
    name: "Atualização da aplicação MechanicGuide",
    value: 480,
    date: new Date("2025-07-21"),
  },
  {
    id: 3,
    supplierId: 3,
    name: "Manutenção da máquina de limpeza para bico injetor",
    value: 800,
    date: new Date(),
  },
];

const productPurchasesMock: ProductPurchase[] = [
  {
    id: 1,
    supplierId: 2,
    pieceId: 1,
    quantity: 1,
    value: 90,
    date: new Date("2025-07-21"),
  },
  {
    id: 2,
    supplierId: 6,
    pieceId: 2,
    quantity: 2,
    value: 40,
    date: new Date("2025-07-22"),
  },
  {
    id: 3,
    supplierId: 2,
    pieceId: 1,
    quantity: 2,
    value: 180,
    date: new Date("2025-07-22"),
  },
  {
    id: 4,
    supplierId: 4,
    pieceId: 3,
    quantity: 20,
    value: 500,
    date: new Date("2025-07-23"),
  },
  {
    id: 5,
    supplierId: 1,
    pieceId: 4,
    quantity: 1,
    value: 200,
    date: new Date(),
  },
];

export class PurchaseMockDataSource implements PurchaseDataSource {
  async listServicePurchases(): Promise<ServicePurchase[] | null> {
    await delay(300);

    return servicePurchasesMock;
    // return null
  }

  async listProductPurchases(): Promise<ProductPurchase[] | null> {
    await delay(300);

    return productPurchasesMock;
    // return null
  }
}
