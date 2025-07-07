import { Piece } from "../../domain/entities/Piece";
import { PieceCategory } from "../../domain/entities/PieceCategory";

import { AddPieceParams } from "../../domain/useCases/CreatePiece";

import { PieceDataSource } from "../repositories/PieceRepositoryImpl";

import { delay } from "../../shared/utils/delay";

const partsMock: Piece[] = [
  {
    code: 1,
    name: "Pinça de freio Corsa 2011",
    categoryCode: 2,
    price: 137.5,
    supplierCode: 2,
  },
  {
    code: 2,
    name: "Óleo de freio DOT 4",
    categoryCode: 2,
    price: 28,
    supplierCode: 6,
  },
  {
    code: 3,
    name: "Óleo de motor 5W30",
    categoryCode: 1,
    price: 30.99,
    supplierCode: 4,
  },
  {
    code: 4,
    name: "Radiador Gol G3 S/A",
    categoryCode: 3,
    price: 270.0,
    supplierCode: 1,
  },
];

const pieceCategoriesMock: PieceCategory[] = [
  { code: 1, category: "Motor" },
  { code: 2, category: "Freio" },
  { code: 3, category: "Arrefecimento" },
  { code: 4, category: "Direção" },
  { code: 5, category: "Suspensão" },
];

export class PieceMockDataSource implements PieceDataSource {
  async list(): Promise<Piece[] | null> {
    await delay(500);

    return partsMock;
    // return null;
  }

  async listCategories(): Promise<PieceCategory[] | null> {
    await delay(500);

    return pieceCategoriesMock;
    // return null;
  }

  async add(piece: AddPieceParams): Promise<Piece | Error> {
    await delay(500);

    try {
      partsMock.push({
        code: partsMock[partsMock.length - 1].code + 1,
        name: piece.name,
        categoryCode: piece.categoryCode,
        price: piece.price,
        supplierCode: piece.supplierCode,
      });

      return partsMock[length - 1];
    } catch {
      return Error("Unable to register a new piece");
    }
  }

  async edit(piece: Piece): Promise<Piece | Error> {
    try {
      const editedPieceIndex = partsMock.findIndex(
        (registeredPiece) => registeredPiece.code === piece.code
      );

      partsMock[editedPieceIndex] = {
        code: piece.code,
        name: piece.name,
        categoryCode: piece.categoryCode,
        supplierCode: piece.supplierCode,
        price: piece.price,
      };

      return partsMock[editedPieceIndex];
    } catch {
      return Error("It was not possible to edit the piece");
    }
  }

  async remove(pieceCode: number): Promise<Piece | Error> {
    try {
      const removedPieceIndex = partsMock.findIndex(
        (registeredPiece) => registeredPiece.code === pieceCode
      );

      const removedPiece = partsMock[removedPieceIndex];

      partsMock.splice(removedPieceIndex, 1);

      return removedPiece;
    } catch {
      return Error("It was not possible to remove the piece");
    }
  }
}
