import { Piece } from "../entities/Piece";

import { PieceRepository } from "../repositories/PieceRepository";
import { SupplierRepository } from "../repositories/SupplierRepository";

import { isValidPiece as pieceValid } from "../validators/isValidPiece";
import { pieceAlreadyExists } from "../validators/pieceAlreadyExists";
import { supplierAlreadyExists } from "../validators/supplierAlreadyExists";
import { categoryAlreadyExists } from "../validators/categoryAlreadyExists";

export class EditPiece {
  constructor(
    private pieceRepository: PieceRepository,
    private supplierRepository: SupplierRepository
  ) {}

  async exec(piece: Piece): Promise<Piece | Error> {
    const isPieceValid = pieceValid(piece);
    if (!isPieceValid) return Error("The piece is invalid");

    const parts = await this.pieceRepository.listPieces();
    const suppliers = await this.supplierRepository.list();
    const pieceCategories = await this.pieceRepository.listCategories();

    if (parts && suppliers && pieceCategories) {
      const pieceExists = pieceAlreadyExists(piece.code, parts);
      const supplierExists = supplierAlreadyExists(
        piece.supplierCode,
        suppliers
      );
      const pieceCategoryExists = categoryAlreadyExists(
        piece.categoryCode,
        pieceCategories
      );

      if (pieceExists && supplierExists && pieceCategoryExists) {
        const editedPiece = await this.pieceRepository.editPiece(piece);

        return editedPiece;
      }

      return pieceExists
        ? supplierExists
          ? Error("The piece category code is invalid")
          : Error("The supplier code is invalid")
        : Error("The piece code is invalid");
    }

    return Error("It was not possible to edit piece");
  }
}
