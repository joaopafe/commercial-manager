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
        categoryCode: 2,
        price: 28,
        supplierCode: 3,
        quantity: 14,
      },
      {
        code: 2,
        name: "Pinça de freio Corsa 2011",
        categoryCode: 2,
        price: 137.5,
        supplierCode: 2,
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
        categoryCode: 1,
        price: 120,
        supplierCode: 7,
        quantity: 3,
      },
      {
        code: 4,
        name: "Óleo de motor 5W30",
        categoryCode: 1,
        price: 30.99,
        supplierCode: 4,
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
        categoryCode: 3,
        price: 270,
        supplierCode: 1,
        quantity: 1,
      },
      {
        code: 6,
        name: "Raidador Gol G3 C/A",
        categoryCode: 3,
        price: 285,
        supplierCode: 5,
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
