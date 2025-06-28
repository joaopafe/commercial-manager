import { FC } from "react";

import { StockLine } from "./StockLine";

import { StockProps } from "./StockLine";

interface StockTableProps {
  items: StockProps[];
  openModal(isEntryStockModal: boolean): void;
  changePieceCode(pieceCode: number): void;
}

export const StockTable: FC<StockTableProps> = ({
  items,
  openModal,
  changePieceCode,
}) => {
  const stockLines = items.map((item) => {
    return (
      <StockLine
        code={item.code}
        name={item.name}
        supplier={item.supplier}
        quantity={item.quantity}
        price={item.price}
        key={item.code}
        openModal={openModal}
        changePieceCode={changePieceCode}
      />
    );
  });

  return (
    <table className="stock-table">
      <thead className="stock-table-head">
        <tr>
          <th className="stock-table-head-column" id="item-code-head">
            Código
          </th>
          <th className="stock-table-head-column" id="item-name-head">
            Nome
          </th>
          <th className="stock-table-head-column" id="item-supplier-head">
            Fornecedor
          </th>
          <th className="stock-table-head-column" id="items-quantity-head">
            Quantidade
          </th>
          <th className="stock-table-head-column" id="item-price-head">
            Preço
          </th>
          <th className="stock-table-head-column" id="item-actions-head">
            Ações
          </th>
        </tr>
      </thead>

      <tbody className="stock-table-body">{stockLines}</tbody>
    </table>
  );
};
