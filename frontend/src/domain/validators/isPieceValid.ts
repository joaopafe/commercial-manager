import { Piece } from "../entities/Piece";

export const isPieceValid = (piece: Piece) => {
  const isPieceValid =
    piece.name.length >= 3 &&
    piece.category.length >= 3 &&
    piece.supplier.length >= 2 &&
    piece.price >= 0.1;

  if (isPieceValid) return true;

  return false;
};
