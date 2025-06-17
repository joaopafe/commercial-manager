import { Piece } from "../entities/Piece";

import { PieceRepository } from "../repositories/PieceRepository";

import { pieceAlreadyExists } from "../validators/pieceAlreadyExists";

export class RemovePiece {
  constructor(private pieceRepository: PieceRepository) {}

  async exec(pieceCode: number): Promise<Piece | Error> {
    const parts = await this.pieceRepository.listPieces();

    if (parts) {
      const pieceExists = pieceAlreadyExists(pieceCode, parts);

      if (pieceExists) {
        const removedPiece = await this.pieceRepository.removePiece(pieceCode);

        return removedPiece;
      }
    }
    return Error("It was not possible to remove the piece");
  }
}
