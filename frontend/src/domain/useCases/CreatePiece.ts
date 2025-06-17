import { Piece } from "../entities/Piece";
import { PieceRepository } from "../repositories/PieceRepository";

export interface AddPieceParams {
  name: string;
  category: string;
  price: number;
  supplier: string;
}

export class CreatePiece {
  constructor(private pieceRepository: PieceRepository) {}

  async exec(piece: AddPieceParams): Promise<Piece | Error> {
    const isValidPiece =
      piece.name.length >= 3 &&
      piece.category.length >= 3 &&
      piece.price > 0 &&
      piece.supplier.length >= 2;

    if (!isValidPiece) return Error("The piece is invalid");

    const registeredPiece = await this.pieceRepository.addPiece(piece);

    return registeredPiece;
  }
}
