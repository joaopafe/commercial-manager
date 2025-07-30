import { FC } from "react";

export interface ServicePurchaseProps {
  code: number;
  description: string;
  supplierName: string;
  value: number;
  date: Date;
}

export interface ServicePurchaseLineProps extends ServicePurchaseProps {
  openModal(isCreateModal: boolean): void;
  changeServicePurchaseCode(servicePurchaseCode: number): void;
  removeServicePurchase(servicePurchaseCode: number): void;
}

export const ServicePurchaseLine: FC<ServicePurchaseLineProps> = ({
  code,
  description,
  supplierName,
  value,
  date,
  openModal,
  changeServicePurchaseCode,
  removeServicePurchase,
}) => {
  return (
    <tr className="service-purchase-line" key={code}>
      <td className="service-purchase-code">{code}</td>
      <td className="service-purchase-description">{description}</td>
      <td className="service-purchase-supplier-name">{supplierName}</td>
      <td className="service-purchase-value">R$ {value}</td>
      <td className="service-purchase-date">{date.toLocaleDateString()}</td>
      <td className="service-purchase-actions">
        <button
          className="edit-button"
          onClick={() => {
            openModal(false);
            changeServicePurchaseCode(code);
          }}
        >
          Editar
        </button>
        <button
          className="exclude-button"
          onClick={() => console.log("Removendo compra...")}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};
