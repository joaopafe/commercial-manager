import { FC } from "react";

import { CashRegister } from "../../domain/entities/CashRegister";

interface CashFlowLineProps extends CashRegister {
  code: number;
}

export const CashFlowLine: FC<CashFlowLineProps> = ({
  code,
  date,
  description,
  value,
  type,
}) => {
  return (
    <tr className="cash-flow-line" key={code}>
      <td className="cash-flow-date">{date.toLocaleDateString()}</td>
      <td className="cash-flow-description">{description}</td>
      <td className="cash-flow-value">{value}</td>
      <td className="cash-flow-type">{type}</td>
    </tr>
  );
};
