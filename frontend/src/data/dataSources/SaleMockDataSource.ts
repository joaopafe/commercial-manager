import { Sale } from "../../domain/entities/Sale";

import { SaleDataSource } from "../repositories/SaleRepositoryImpl";

import { delay } from "../../shared/utils/delay";

const latestSalesMock: Sale[] = [
  {
    clientName: "José Antônio Moreira",
    value: 452.8,
    date: new Date(),
  },
  {
    clientName: "André Romero de Souza",
    value: 94.5,
    date: new Date(),
  },
  {
    clientName: "Lúcio Castro de Lima",
    value: 128.5,
    date: new Date(),
  },
];

export class SaleMockDataSource implements SaleDataSource {
  async listLatest(): Promise<Sale[] | null> {
    await delay(2_000);

    return latestSalesMock;
    // return null;
  }
}
