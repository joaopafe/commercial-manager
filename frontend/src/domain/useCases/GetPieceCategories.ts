import { PieceRepository } from "../repositories/PieceRepository";

export class GetPieceCategories {
  constructor(private pieceRepository: PieceRepository) {}

  async execute() {
    const pieceCategories = await this.pieceRepository.listCategories();

    if (pieceCategories === null) Error("Unable to get piece categories");

    return pieceCategories;
  }
}
