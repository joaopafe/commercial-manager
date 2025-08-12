import { FC } from "react";

import { CashRegister } from "../../domain/entities/CashRegister";

import { formatToBRL } from "../../shared/utils/formatToBRL";

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
  const formattedValue = formatToBRL(value);

  return (
    <tr className="cash-flow-line" key={code}>
      <td className="cash-flow-date">{date.toLocaleDateString()}</td>
      <td className="cash-flow-description">{description}</td>
      <td className="cash-flow-value">{formattedValue}</td>
      <td className="cash-flow-type">{type}</td>
    </tr>
  );
};
