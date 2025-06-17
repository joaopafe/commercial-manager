import { Piece } from "../entities/Piece";

import { PieceRepository } from "../repositories/PieceRepository";

import { pieceAlreadyExists } from "../validators/pieceAlreadyExists";
import { isPieceValid as pieceValid } from "../validators/isPieceValid";

export class EditPiece {
  constructor(private pieceRepository: PieceRepository) {}

  async exec(piece: Piece): Promise<Piece | Error> {
    const parts = await this.pieceRepository.listPieces();

    if (parts) {
      const pieceExists = pieceAlreadyExists(piece.code, parts);

      if (pieceExists) {
        const isPieceValid = pieceValid(piece);

        if (isPieceValid) {
          const editedPiece = await this.pieceRepository.editPiece(piece);

          return editedPiece;
        }
      }

      return Error("The parts is invalid for editing");
    }

    return Error("It was not possible to edit the piece");
  }
}
