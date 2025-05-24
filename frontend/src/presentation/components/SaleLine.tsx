import { FC } from "react";

interface SaleLineProps {
  clientName: string;
  saleValue: number;
  saleDate: string;
}

export const SaleLine: FC<SaleLineProps> = ({
  clientName,
  saleValue,
  saleDate,
}) => {
  return (
    <tr className="sale-line">
      <td className="client-name">{clientName}</td>
      <td className="sale-value">R$ {saleValue}</td>
      <td className="sale-date">{saleDate}</td>
    </tr>
  );
};
