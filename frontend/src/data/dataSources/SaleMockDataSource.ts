import { ServiceSale } from "../../domain/entities/ServiceSale";
import { ProductSale } from "../../domain/entities/ProductSale";

import { AddServiceSaleParams } from "../../domain/useCases/CreateServiceSale";
import { AddProductSaleParams } from "../../domain/useCases/CreateProductSale";

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

  async addServiceSale(
    serviceSale: AddServiceSaleParams
  ): Promise<ServiceSale | Error> {
    await delay(300);

    try {
      serviceSalesMock.push({
        id: serviceSalesMock.length + 1,
        clientId: serviceSale.clientId,
        name: serviceSale.name,
        value: serviceSale.value,
        date: serviceSale.date,
      });

      return serviceSalesMock[length - 1];
    } catch {
      return Error("Unable to register a new service sale");
    }
  }

  async editServiceSale(
    serviceSale: ServiceSale
  ): Promise<ServiceSale | Error> {
    await delay(100);

    try {
      const editedServiceSaleIndex = serviceSalesMock.findIndex(
        (registeredServiceSale) => registeredServiceSale.id === serviceSale.id
      );

      serviceSalesMock[editedServiceSaleIndex] = {
        id: serviceSale.id,
        name: serviceSale.name,
        clientId: serviceSale.clientId,
        value: serviceSale.value,
        date: serviceSale.date,
      };

      return serviceSalesMock[editedServiceSaleIndex];
    } catch {
      return Error("It was not possible to edit the service sale");
    }
  }

  async removeServiceSale(
    serviceSaleCode: number
  ): Promise<ServiceSale | Error> {
    await delay(100);

    try {
      const removedServiceSaleIndex = serviceSalesMock.findIndex(
        (registeredServiceSale) => {
          return registeredServiceSale.id === serviceSaleCode;
        }
      );

      const removedServiceSale = serviceSalesMock[removedServiceSaleIndex];

      serviceSalesMock.splice(removedServiceSaleIndex, 1);

      return removedServiceSale;
    } catch {
      return Error("It was not possible to remove the service sale");
    }
  }

  async addProductSale(
    productSale: AddProductSaleParams
  ): Promise<ProductSale | Error> {
    await delay(100);

    try {
      productSalesMock.push({
        id: productSalesMock.length + 1,
        clientId: productSale.clientId,
        pieceId: productSale.pieceId,
        quantity: productSale.quantity,
        value: productSale.value,
        date: productSale.date,
      });

      return productSalesMock[length - 1];
    } catch {
      return Error("Unable to register a new product sale");
    }
  }
}
