import { Piece } from "../entities/Piece";

import { PieceRepository } from "../repositories/PieceRepository";
import { SupplierRepository } from "../repositories/SupplierRepository";

import { isPieceValid as pieceValid } from "../validators/isPieceValid";
import { supplierAlreadyExists } from "../validators/supplierAlreadyExists";
import { categoryAlreadyExists } from "../validators/categoryAlreadyExists";

export interface AddPieceParams {
  name: string;
  categoryCode: number;
  price: number;
  supplierCode: number;
}

export class CreatePiece {
  constructor(
    private pieceRepository: PieceRepository,
    private supplierRepository: SupplierRepository
  ) {}

  async exec(piece: AddPieceParams): Promise<Piece | Error> {
    const isPieceValid = pieceValid(piece);
    if (!isPieceValid) return Error("The piece is invalid");

    const suppliers = await this.supplierRepository.list();
    const pieceCategories = await this.pieceRepository.listCategories();

    if (suppliers && pieceCategories) {
      const supplierExists = supplierAlreadyExists(
        piece.supplierCode,
        suppliers
      );
      const pieceCategoryExists = categoryAlreadyExists(
        piece.categoryCode,
        pieceCategories
      );

      if (supplierExists && pieceCategoryExists) {
        const registeredPiece = await this.pieceRepository.addPiece(piece);

        return registeredPiece;
      }

      return supplierExists
        ? Error("The piece category code is invalid")
        : Error("The supplier code is invalid");
    }

    return Error("It was not possible to create piece");
  }
}
