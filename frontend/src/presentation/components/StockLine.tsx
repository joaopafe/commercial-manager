import { FC } from "react";

export interface StockProps {
  code: number;
  name: string;
  supplier: string;
  quantity: number;
  price: number;
}

export interface StockLineProps extends StockProps {
  openModal(isEntryStockModal: boolean): void;
}

export const StockLine: FC<StockLineProps> = ({
  code,
  name,
  supplier,
  quantity,
  price,
  openModal,
}) => {
  return (
    <tr className="stock-line">
      <td className="item-code">{code}</td>
      <td className="item-name">{name}</td>
      <td className="item-supplier">{supplier}</td>
      <td className="item-quantity">{quantity}</td>
      <td className="item-price">R$ {price}</td>
      <td className="item-actions">
        <button className="stock-entry-button" onClick={() => openModal(true)}>
          Entrada
        </button>
        <button className="stock-out-button" onClick={() => openModal(false)}>
          Saída
        </button>
      </td>
    </tr>
  );
};
