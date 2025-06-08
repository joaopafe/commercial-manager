import { Piece } from "../entities/Piece";

export const pieceAlreadyExists = (pieceCode: number, parts: Piece[]) => {
  const pieceAlreadyExists =
    parts.filter((piece) => {
      return piece.code === pieceCode;
    }).length === 1;

  return pieceAlreadyExists;
};
