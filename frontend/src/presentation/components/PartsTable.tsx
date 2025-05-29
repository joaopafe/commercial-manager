import { FC } from "react";

import { PieceLine } from "./PieceLine";

import { PieceLineProps as Piece } from "./PieceLine";

interface PartsTableProps {
  parts: Piece[];
}

export const PartsTable: FC<PartsTableProps> = ({ parts }) => {
  const pieceLines = parts.map((piece) => {
    return (
      <PieceLine
        code={piece.code}
        name={piece.name}
        category={piece.category}
        price={piece.price}
        key={piece.code}
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
          <th className="part-table-head-column" id="part-actions-head">
            Ações
          </th>
        </tr>
      </thead>

      <tbody className="parts-table-body">{pieceLines}</tbody>
    </table>
  );
};
