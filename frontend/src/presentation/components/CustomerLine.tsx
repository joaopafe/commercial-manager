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
  changeCustomerCode(customerCode: number): void;
  removeCustomer(customerCode: number): void;
}

export const CustomerLine: FC<CustomerLineProps> = ({
  code,
  cpf,
  name,
  email,
  phone,
  openModal,
  changeCustomerCode,
  removeCustomer,
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
            changeCustomerCode(code);
          }}
        >
          Editar
        </button>
        <button className="exclude-button" onClick={() => removeCustomer(code)}>
          Excluir
        </button>
      </td>
    </tr>
  );
};
