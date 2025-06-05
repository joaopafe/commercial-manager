import { Piece } from "../domain/entities/Piece";
import { PieceCategory } from "../domain/entities/PieceCategory";

import { PieceDataSource } from "../domain/data/PieceRepository";

import { delay } from "../shared/utils/delay";

const partsMock: Piece[] = [
  {
    code: 1,
    name: "Pinça de freio Corsa 2011",
    category: "Freio",
    price: 137.5,
    supplier: "GM",
  },
  {
    code: 2,
    name: "Óleo de freio DOT 4",
    category: "Freio",
    price: 28,
    supplier: "Bosh",
  },
  {
    code: 3,
    name: "Óleo de motor 5W30",
    category: "Motor",
    price: 30.99,
    supplier: "Mobil",
  },
  {
    code: 4,
    name: "Radiador Gol G3 S/A",
    category: "Arrefecimento",
    price: 270.0,
    supplier: "Visconde",
  },
];

const pieceCategoriesMock: PieceCategory[] = [
  "Motor",
  "Freio",
  "Arrefecimento",
  "Direção",
  "Suspensão",
];

export class PieceMockDataSource implements PieceDataSource {
  async list(): Promise<Piece[] | null> {
    await delay(2_000);

    return partsMock;
    // return null;
  }

  async listCategories(): Promise<PieceCategory[] | null> {
    await delay(2_000);

    return pieceCategoriesMock;
    // return null;
  }

  async add(piece: Piece): Promise<Piece | Error> {
    await delay(2_000);

    try {
      partsMock.push({
        code: piece.code,
        name: piece.name,
        category: piece.category,
        price: piece.price,
        supplier: piece.supplier,
      });

      return piece;
    } catch {
      return Error("Unable to register a new piece");
    }
  }
}
