import { PieceStock } from "./PieceStock";

export interface StockGroup {
  partsStock: PieceStock[];
  category: string;
}
