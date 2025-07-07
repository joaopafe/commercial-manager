import { FC } from "react";

import { PieceLine } from "./PieceLine";

import { Piece } from "../../domain/entities/Piece";
import { Supplier } from "../../domain/entities/Supplier";
import { PieceCategory } from "../../domain/entities/PieceCategory";

interface PartsTableProps {
  parts: Piece[];
  suppliers: Supplier[];
  pieceCategories: PieceCategory[];
  openModal(isCreateModal: boolean): void;
  changePieceCode(pieceCode: number): void;
  removePiece(pieceCode: number): void;
}

export const PartsTable: FC<PartsTableProps> = ({
  parts,
  suppliers,
  pieceCategories,
  openModal,
  changePieceCode,
  removePiece,
}) => {
  const pieceLines = parts.map((piece) => {
    const supplier = suppliers.find(
      (supplier) => supplier.code === piece.supplierCode
    );
    const pieceCategory = pieceCategories.find(
      (pieceCategory) => pieceCategory.code === piece.categoryCode
    );

    return (
      <PieceLine
        code={piece.code}
        name={piece.name}
        category={pieceCategory ? pieceCategory.category : ""}
        price={piece.price}
        supplier={supplier ? supplier.name : ""}
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
