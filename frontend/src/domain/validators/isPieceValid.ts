import { Piece } from "../entities/Piece";

export const isPieceValid = (piece: Piece, parts: Piece[]) => {
  const pieceAlreadyExists =
    parts.filter((p) => {
      return p.code === piece.code;
    }).length === 1;

  if (pieceAlreadyExists) {
    const isPieceValid =
      piece.name.length >= 3 &&
      piece.category.length >= 3 &&
      piece.supplier.length >= 2 &&
      piece.price >= 0.1;

    if (isPieceValid) return true;
  }

  return false;
};
