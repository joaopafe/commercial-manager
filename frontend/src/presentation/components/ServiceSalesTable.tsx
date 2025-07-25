import { FC } from "react";

import { ServiceSaleLine } from "./ServiceSaleLine";

import { ServiceSale } from "../../domain/entities/ServiceSale";
import { Customer } from "../../domain/entities/Customer";

interface ServiceSalesTableProps {
  serviceSales: ServiceSale[];
  customers: Customer[];
  openModal(isCreateModal: boolean): void;
}

export const ServiceSalesTable: FC<ServiceSalesTableProps> = ({
  serviceSales,
  customers,
  openModal,
}) => {
  const serviceSaleLines = serviceSales.map((serviceSale) => {
    const customer = customers.find((customer) => {
      return customer.code === serviceSale.clientId;
    });

    return (
      <ServiceSaleLine
        code={serviceSale.id}
        description={serviceSale.name}
        clientName={customer ? customer.name : ""}
        value={serviceSale.value}
        date={serviceSale.date}
        openModal={openModal}
        key={serviceSale.id}
      />
    );
  });

  return (
    <table className="service-sales-table">
      <thead className="service-sales-head">
        <tr>
          <th
            className="service-sale-table-head-column"
            id="service-sale-code-head"
          >
            Código
          </th>
          <th
            className="service-sale-table-head-column"
            id="service-sale-description-head"
          >
            Descrição
          </th>
          <th
            className="service-sale-table-head-column"
            id="service-sale-client-name-head"
          >
            Cliente
          </th>
          <th
            className="service-sale-table-head-column"
            id="service-sale-value-head"
          >
            Valor
          </th>
          <th
            className="service-sale-table-head-column"
            id="service-sale-date-head"
          >
            Data
          </th>
          <th
            className="service-sale-table-head-column"
            id="service-sale-actions-head"
          >
            Ações
          </th>
        </tr>
      </thead>

      <tbody className="service-sales-body">{serviceSaleLines}</tbody>
    </table>
  );
};
