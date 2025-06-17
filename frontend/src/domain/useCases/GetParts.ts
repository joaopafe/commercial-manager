import { PieceRepository } from "../repositories/PieceRepository";

export class GetParts {
  constructor(private pieceRepository: PieceRepository) {}

  async execute() {
    const parts = await this.pieceRepository.listPieces();

    if (parts === null) Error("Unable to get parts");

    return parts;
  }
}
