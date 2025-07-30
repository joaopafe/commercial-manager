import { StockGroup } from "../entities/StockGroup";

export const thereIsStockAvailable = (
  pieceId: number,
  quantity: number,
  stockGroups: StockGroup[]
): boolean => {
  const allPartsStock = stockGroups.flatMap((stockGroup) => {
    return stockGroup.partsStock;
  });

  const pieceStock = allPartsStock.find((pieceStock) => {
    return pieceStock.code === pieceId;
  });

  if (pieceStock) {
    return pieceStock.quantity >= quantity;
  }

  return false;
};
