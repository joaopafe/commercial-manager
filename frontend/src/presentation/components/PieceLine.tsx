import { FC } from "react";

export interface PieceProps {
  code: number;
  name: string;
  category: string;
  price: number;
  supplier: string;
}

export interface PieceLineProps extends PieceProps {
  openModal(isCreateModal: boolean): void;
  changePieceCode(pieceCode: number): void;
  removePiece(pieceCode: number): void;
}

export const PieceLine: FC<PieceLineProps> = ({
  code,
  name,
  category,
  price,
  supplier,
  openModal,
  changePieceCode,
  removePiece,
}) => {
  return (
    <tr className="piece-line">
      <td className="piece-code">{code}</td>
      <td className="piece-name">{name}</td>
      <td className="piece-category">{category}</td>
      <td className="piece-price">R$ {price}</td>
      <td className="piece-supplier">{supplier}</td>
      <td className="piece-actions">
        <button
          className="edit-button"
          onClick={() => {
            openModal(false);
            changePieceCode(code);
          }}
        >
          Editar
        </button>
        <button className="exclude-button" onClick={() => removePiece(code)}>
          Excluir
        </button>
      </td>
    </tr>
  );
};
