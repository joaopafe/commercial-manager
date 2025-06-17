import { Piece } from "../entities/Piece";
import { PieceCategory } from "../entities/PieceCategory";

import { AddPieceParams } from "../useCases/CreatePiece";

export interface PieceRepository {
  listPieces(): Promise<Piece[] | null>;
  listCategories(): Promise<PieceCategory[] | null>;
  addPiece(piece: AddPieceParams): Promise<Piece | Error>;
  editPiece(piece: Piece): Promise<Piece | Error>;
  removePiece(pieceCode: number): Promise<Piece | Error>;
}
