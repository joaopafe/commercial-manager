import { FC } from "react";

export interface SupplierProps {
  code: number;
  cnpj: string;
  name: string;
  phone: string;
}

export const SupplierLine: FC<SupplierProps> = ({
  code,
  cnpj,
  name,
  phone,
}) => {
  return (
    <tr className="supplier-line">
      <td className="supplier-code">{code}</td>
      <td className="supplier-cnpj">{cnpj}</td>
      <td className="supplier-name">{name}</td>
      <td className="supplier-phone">{phone}</td>
      <td className="supplier-actions">
        <button className="edit-button">Editar</button>
        <button className="exclude-button">Excluir</button>
      </td>
    </tr>
  );
};
