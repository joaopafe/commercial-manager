import { FC } from "react";

import { StockTable } from "./StockTable";

import { Supplier } from "../../domain/entities/Supplier";
import { PieceStock } from "../../domain/entities/PieceStock";

interface StockSectionProps {
  category: string;
  suppliers: Supplier[];
  items: PieceStock[];
  openModal(isEntryStockModal: boolean): void;
  changePieceCode(pieceCode: number): void;
  changeTotalQuantity(totalQuantity: number): void;
}

export const StockSection: FC<StockSectionProps> = ({
  category,
  items,
  suppliers,
  openModal,
  changePieceCode,
  changeTotalQuantity,
}) => {
  return (
    <div className="stock-section-category">
      <div className="category-item-name">{category}</div>

      <StockTable
        items={items}
        suppliers={suppliers}
        openModal={openModal}
        changePieceCode={changePieceCode}
        changeTotalQuantity={changeTotalQuantity}
      />
    </div>
  );
};
