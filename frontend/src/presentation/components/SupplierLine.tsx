import { FC } from "react";

export interface SupplierProps {
  code: number;
  cnpj: string;
  name: string;
  phone: string;
}

export interface SupplierLineProps extends SupplierProps {
  openModal(isCreateModal: boolean): void;
  changeSupplierCode(supplierCode: number): void;
  removeSupplier(supplierCode: number): void;
}

export const SupplierLine: FC<SupplierLineProps> = ({
  code,
  cnpj,
  name,
  phone,
  openModal,
  changeSupplierCode,
  removeSupplier,
}) => {
  return (
    <tr className="supplier-line">
      <td className="supplier-code">{code}</td>
      <td className="supplier-cnpj">{cnpj}</td>
      <td className="supplier-name">{name}</td>
      <td className="supplier-phone">{phone}</td>
      <td className="supplier-actions">
        <button
          className="edit-button"
          onClick={() => {
            openModal(false);
            changeSupplierCode(code);
          }}
        >
          Editar
        </button>
        <button className="exclude-button" onClick={() => removeSupplier(code)}>
          Excluir
        </button>
      </td>
    </tr>
  );
};
