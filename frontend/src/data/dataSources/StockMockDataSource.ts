import { StockGroup } from "../../domain/entities/StockGroup";

import { StockDataSource } from "../repositories/StockRepositoryImpl";

import { delay } from "../../shared/utils/delay";

const stockGroups: StockGroup[] = [
  {
    category: "Freio",
    partsStock: [
      {
        code: 1,
        name: "Óleo de Freio DOT4",
        category: "Freio",
        price: 28,
        supplier: "Bosh",
        quantity: 14,
      },
      {
        code: 2,
        name: "Pinça de freio Corsa 2011",
        category: "Freio",
        price: 137.5,
        supplier: "GM",
        quantity: 6,
      },
    ],
  },
  {
    category: "Motor",
    partsStock: [
      {
        code: 3,
        name: "Correira dentada HB20",
        category: "Motor",
        price: 120,
        supplier: "Hyundai",
        quantity: 3,
      },
      {
        code: 4,
        name: "Óleo de motor 5W30",
        category: "Motor",
        price: 30.99,
        supplier: "Mobil",
        quantity: 17,
      },
    ],
  },
  {
    category: "Arrefecimento",
    partsStock: [
      {
        code: 5,
        name: "Radiador Gol G3 S/A",
        category: "Arrefecimento",
        price: 270,
        supplier: "Visconde",
        quantity: 1,
      },
      {
        code: 6,
        name: "Raidador Gol G3 C/A",
        category: "Arrefecimento",
        price: 285,
        supplier: "Valeo",
        quantity: 2,
      },
    ],
  },
];

export class StockMockDataSource implements StockDataSource {
  async list(): Promise<StockGroup[] | null> {
    await delay(1_000);

    return stockGroups;
    // return null
  }

  async insertStock(
    pieceCode: number,
    quantity: number
  ): Promise<StockGroup[] | Error> {
    await delay(2_000);

    let wasUpdatedQuantity = false;

    for (const stockGroup of stockGroups) {
      const editedPiece = stockGroup.partsStock.find(
        (piece) => piece.code === pieceCode
      );

      if (editedPiece) {
        editedPiece.quantity += quantity;

        wasUpdatedQuantity = true;
      }
    }

    if (wasUpdatedQuantity) return stockGroups;

    return Error("It was not possible to insert stock");
  }

  async removeStock(
    pieceCode: number,
    quantity: number
  ): Promise<StockGroup[] | Error> {
    await delay(1_000);

    let wasUpdatedQuantity = false;

    for (const stockGroup of stockGroups) {
      const editedPiece = stockGroup.partsStock.find(
        (piece) => piece.code === pieceCode
      );

      if (editedPiece) {
        editedPiece.quantity -= quantity;

        wasUpdatedQuantity = true;
      }
    }

    if (wasUpdatedQuantity) return stockGroups;

    return Error("It was not possible to remove stock");
  }
}
