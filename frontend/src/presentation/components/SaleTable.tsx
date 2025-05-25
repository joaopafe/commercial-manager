import { FC } from "react";

import { SaleLine } from "./SaleLine";

interface Sale {
  clientName: string;
  value: number;
  date: string;
}

interface SaleTableProps {
  sales: Sale[];
}

export const SaleTable: FC<SaleTableProps> = ({ sales }) => {
  const saleLines = sales.map((sale, index) => {
    return (
      <SaleLine
        clientName={sale.clientName}
        value={sale.value}
        date={sale.date}
        key={index}
      />
    );
  });

  return (
    <table className="sale-table">
      <thead className="sale-table-head">
        <tr>
          <th className="sale-table-head-column" id="client-head">
            Cliente
          </th>
          <th className="sale-table-head-column" id="sale-value-head">
            Valor
          </th>
          <th className="sale-table-head-column" id="sale-date-head">
            Data
          </th>
        </tr>
      </thead>

      <tbody className="sale-table-body">{saleLines}</tbody>
    </table>
  );
};
