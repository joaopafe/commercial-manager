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
  },
  {
    code: 2,
    name: "Óleo de freio DOT 4",
    category: "Freio",
    price: 28,
  },
  {
    code: 3,
    name: "Óleo Mobil 5W30",
    category: "Motor",
    price: 30.99,
  },
  {
    code: 4,
    name: "Radiador Gol G3 S/A",
    category: "Arrefecimento",
    price: 270.0,
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
}
