import { FC } from "react";

import { StockLine } from "./StockLine";

import { PieceStock } from "../../domain/entities/PieceStock";
import { Supplier } from "../../domain/entities/Supplier";

interface StockTableProps {
  items: PieceStock[];
  suppliers: Supplier[];
  openModal(isEntryStockModal: boolean): void;
  changePieceCode(pieceCode: number): void;
  changeTotalQuantity(totalQuantity: number): void;
}

export const StockTable: FC<StockTableProps> = ({
  items,
  suppliers,
  openModal,
  changePieceCode,
  changeTotalQuantity,
}) => {
  const stockLines = items.map((item) => {
    const supplier = suppliers.find(
      (supplier) => supplier.code === item.supplierCode
    );

    return (
      <StockLine
        code={item.code}
        name={item.name}
        supplier={supplier ? supplier.name : ""}
        quantity={item.quantity}
        price={item.price}
        key={item.code}
        openModal={openModal}
        changePieceCode={changePieceCode}
        changeTotalQuantity={changeTotalQuantity}
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
