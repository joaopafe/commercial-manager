import { AddPieceParams } from "../useCases/CreatePiece";

export const isValidPiece = (piece: AddPieceParams) => {
  const isPieceValid =
    piece.name.length >= 3 &&
    piece.categoryCode >= 1 &&
    piece.supplierCode >= 1 &&
    piece.price > 0;

  if (isPieceValid) return true;

  return false;
};
