import { FC } from "react";

import { ServicePurchaseLine } from "./ServicePurchaseLine";

import { ServicePurchase } from "../../domain/entities/ServicePurchase";
import { Supplier } from "../../domain/entities/Supplier";

interface ServicePurchasesTableProps {
  servicePurchases: ServicePurchase[];
  suppliers: Supplier[];
  openModal(isCreateModal: boolean): void;
  changeServicePurchaseCode(servicePurchaseCode: number): void;
  removeServicePurchase(servicePurchaseCode: number): void;
}

export const ServicePurchasesTable: FC<ServicePurchasesTableProps> = ({
  servicePurchases,
  suppliers,
  openModal,
  changeServicePurchaseCode,
  removeServicePurchase,
}) => {
  const servicePurchaseLines = servicePurchases.map((servicePurchase) => {
    const supplier = suppliers.find((supplier) => {
      return supplier.code === servicePurchase.supplierId;
    });

    return (
      <ServicePurchaseLine
        code={servicePurchase.id}
        description={servicePurchase.name}
        supplierName={supplier ? supplier.name : ""}
        value={servicePurchase.value}
        date={servicePurchase.date}
        openModal={openModal}
        changeServicePurchaseCode={changeServicePurchaseCode}
        removeServicePurchase={removeServicePurchase}
        key={servicePurchase.id}
      />
    );
  });

  return (
    <table className="service-purchases-table">
      <thead className="service-purchases-table-head">
        <tr>
          <th
            className="service-purchase-table-head-column"
            id="service-purchase-code-head"
          >
            Código
          </th>
          <th
            className="service-purchase-table-head-column"
            id="service-purchase-description-head"
          >
            Descrição
          </th>
          <th
            className="service-purchase-table-head-column"
            id="service-purchase-supplier-name-head"
          >
            Fornecedor
          </th>
          <th
            className="service-purchase-table-head-column"
            id="service-purchase-value-head"
          >
            Valor
          </th>
          <th
            className="service-purchase-table-head-column"
            id="service-purchase-date-head"
          >
            Data
          </th>
          <th
            className="service-purchase-table-head-column"
            id="service-purchase-actions-head"
          >
            Ações
          </th>
        </tr>
      </thead>

      <tbody className="service-purchases-body">{servicePurchaseLines}</tbody>
    </table>
  );
};
