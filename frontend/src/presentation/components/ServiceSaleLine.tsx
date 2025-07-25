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
}

export const ServiceSaleLine: FC<ServiceSaleLineProps> = ({
  code,
  description,
  clientName,
  value,
  date,
  openModal,
}) => {
  return (
    <tr className="service-sale-line" key={code}>
      <td className="service-sale-code">{code}</td>
      <td className="service-sale-description">{description}</td>
      <td className="service-sale-client-name">{clientName}</td>
      <td className="service-sale-value">{value}</td>
      <td className="service-sale-date">{date.toLocaleDateString()}</td>
      <td className="service-sale-actions">
        <button className="edit-button" onClick={() => openModal(false)}>
          Editar
        </button>
        <button className="exclude-button">Excluir</button>
      </td>
    </tr>
  );
};
