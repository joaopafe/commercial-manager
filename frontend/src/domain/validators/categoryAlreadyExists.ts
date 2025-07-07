import { PieceCategory } from "../entities/PieceCategory";

export const categoryAlreadyExists = (
  categoryCode: number,
  pieceCategories: PieceCategory[]
) => {
  const categoryAlreadyExists =
    pieceCategories.filter((pieceCategory) => {
      return pieceCategory.code === categoryCode;
    }).length === 1;

  return categoryAlreadyExists;
};
