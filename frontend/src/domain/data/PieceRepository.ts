import { Piece } from "../entities/Piece";

import { PieceCategory } from "../entities/PieceCategory";

import { isPieceValid as pieceValid } from "../validators/isPieceValid";
import { pieceAlreadyExists } from "../validators/pieceAlreadyExists";

export interface PieceDataSource {
  list(): Promise<Piece[] | null>;
  listCategories(): Promise<PieceCategory[] | null>;
  add(piece: AddPieceParams): Promise<Piece | Error>;
  edit(piece: Piece): Promise<Piece | Error>;
  remove(pieceCode: number): Promise<Piece | Error>;
}

export interface AddPieceParams {
  name: string;
  category: string;
  price: number;
  supplier: string;
}

export class PieceRepository {
  constructor(private mock: PieceDataSource) {}

  async list(): Promise<Piece[] | null> {
    const parts = await this.mock.list();

    if (parts === null) return null;

    return parts;
  }

  async listCategories(): Promise<PieceCategory[] | null> {
    const pieceCategories = await this.mock.listCategories();

    if (pieceCategories === null) return null;

    return pieceCategories;
  }

  async add(piece: AddPieceParams): Promise<Piece | Error> {
    const isValidPiece =
      piece.name.length >= 3 &&
      piece.category.length >= 3 &&
      piece.price > 0 &&
      piece.supplier.length >= 2;

    if (!isValidPiece) return Error("The piece is invalid");

    const registeredPiece = await this.mock.add(piece);

    if (registeredPiece instanceof Error) return registeredPiece;

    return registeredPiece;
  }

  async edit(piece: Piece): Promise<Piece | Error> {
    const parts = await this.list();

    if (parts) {
      const pieceExists = pieceAlreadyExists(piece.code, parts);

      if (pieceExists) {
        const isPieceValid = pieceValid(piece);

        if (isPieceValid) {
          const editedPiece = await this.mock.edit(piece);

          if (editedPiece instanceof Error) return editedPiece;

          return editedPiece;
        }
      }

      return Error("The part is invalid for editing");
    }

    return Error("It was not possible to edit the piece");
  }

  async remove(pieceCode: number): Promise<Piece | Error> {
    const parts = await this.list();

    if (parts) {
      const pieceExists = pieceAlreadyExists(pieceCode, parts);

      if (pieceExists) {
        const removedPiece = await this.mock.remove(pieceCode);

        if (removedPiece instanceof Error) return removedPiece;

        return removedPiece;
      }
    }
    return Error("It was not possible to remove the piece");
  }
}
