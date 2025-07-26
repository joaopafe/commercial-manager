import { FC } from "react";

export interface ServiceSaleProps {
  code: number;
  description: string;
  clientName: string;
  value: number;
  date: Date;
}

export interface ServiceSaleLineProps extends ServiceSaleProps {
  openModal(isCreateModal: boolean): void;
  changeServiceSaleCode(serviceSaleCode: number): void;
  removeServiceSale(serviceSaleCode: number): void;
}

export const ServiceSaleLine: FC<ServiceSaleLineProps> = ({
  code,
  description,
  clientName,
  value,
  date,
  openModal,
  changeServiceSaleCode,
  removeServiceSale,
}) => {
  return (
    <tr className="service-sale-line" key={code}>
      <td className="service-sale-code">{code}</td>
      <td className="service-sale-description">{description}</td>
      <td className="service-sale-client-name">{clientName}</td>
      <td className="service-sale-value">R$ {value}</td>
      <td className="service-sale-date">{date.toLocaleDateString()}</td>
      <td className="service-sale-actions">
        <button
          className="edit-button"
          onClick={() => {
            openModal(false);
            changeServiceSaleCode(code);
          }}
        >
          Editar
        </button>
        <button
          className="exclude-button"
          onClick={() => removeServiceSale(code)}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};
