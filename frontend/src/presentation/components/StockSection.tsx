import { FC } from "react";
import { StockProps } from "./StockLine";
import { StockTable } from "./StockTable";

interface StockSectionProps {
  category: string;
  items: StockProps[];
  openModal(isEntryStockModal: boolean): void;
}

export const StockSection: FC<StockSectionProps> = ({
  category,
  items,
  openModal,
}) => {
  return (
    <div className="stock-section-category">
      <div className="category-item-name">{category}</div>

      <StockTable items={items} openModal={openModal} />
    </div>
  );
};
