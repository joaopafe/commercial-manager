import { FC } from "react";

export interface CustomerProps {
  code: number;
  cpf: string;
  name: string;
  email: string;
  phone: string;
}

export interface CustomerLineProps extends CustomerProps {
  openModal(isCreateModal: boolean): void;
}

export const CustomerLine: FC<CustomerLineProps> = ({
  code,
  cpf,
  name,
  email,
  phone,
  openModal,
}) => {
  return (
    <tr>
      <td className="customer-code">{code}</td>
      <td className="customer-cpf">{cpf}</td>
      <td className="customer-name">{name}</td>
      <td className="customer-email">{email}</td>
      <td className="customer-phone">{phone}</td>
      <td className="customer-actions">
        <button
          className="edit-button"
          onClick={() => {
            openModal(false);
          }}
        >
          Editar
        </button>
        <button className="exclude-button">Excluir</button>
      </td>
    </tr>
  );
};
