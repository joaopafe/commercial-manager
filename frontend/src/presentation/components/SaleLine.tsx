import { FC } from "react";

interface SaleLineProps {
  clientName: string;
  value: number;
  date: string;
}

export const SaleLine: FC<SaleLineProps> = ({ clientName, value, date }) => {
  return (
    <tr className="sale-line">
      <td className="client-name">{clientName}</td>
      <td className="sale-value">R$ {value}</td>
      <td className="sale-date">{date}</td>
    </tr>
  );
};
