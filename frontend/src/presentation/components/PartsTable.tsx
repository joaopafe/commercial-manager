import { FC } from "react";

import { PieceLine } from "./PieceLine";

import { PieceProps as Piece } from "./PieceLine";

interface PartsTableProps {
  parts: Piece[];
  openModal(isCreateModal: boolean): void;
  changePieceCode(pieceCode: number): void;
  removePiece(pieceCode: number): void;
}

export const PartsTable: FC<PartsTableProps> = ({
  parts,
  openModal,
  changePieceCode,
  removePiece,
}) => {
  const pieceLines = parts.map((piece) => {
    return (
      <PieceLine
        code={piece.code}
        name={piece.name}
        category={piece.category}
        price={piece.price}
        supplier={piece.supplier}
        key={piece.code}
        openModal={openModal}
        changePieceCode={changePieceCode}
        removePiece={removePiece}
      />
    );
  });

  return (
    <table className="parts-table">
      <thead className="parts-table-head">
        <tr>
          <th className="part-table-head-column" id="part-code-head">
            Código
          </th>
          <th className="part-table-head-column" id="part-name-head">
            Nome
          </th>
          <th className="part-table-head-column" id="part-category-head">
            Categoria
          </th>
          <th className="part-table-head-column" id="part-price-head">
            Preço
          </th>
          <th className="part-table-head-column" id="part-supplier-head">
            Fornecedor
          </th>
          <th className="part-table-head-column" id="part-actions-head">
            Ações
          </th>
        </tr>
      </thead>

      <tbody className="parts-table-body">{pieceLines}</tbody>
    </table>
  );
};
