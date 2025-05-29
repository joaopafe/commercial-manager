import { FC } from "react";

export interface PieceLineProps {
  code: number;
  name: string;
  category: string;
  price: number;
}

export const PieceLine: FC<PieceLineProps> = ({
  code,
  name,
  category,
  price,
}) => {
  return (
    <tr className="piece-line">
      <td className="piece-code">{code}</td>
      <td className="piece-name">{name}</td>
      <td className="piece-category">{category}</td>
      <td className="piece-price">R$ {price}</td>
      <td className="piece-actions">
        <button className="edit-button">Editar</button>
        <button className="exclude-button">Excluir</button>
      </td>
    </tr>
  );
};
