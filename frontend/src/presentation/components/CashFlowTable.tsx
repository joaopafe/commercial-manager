import { FC } from "react";

import { CashFlowLine } from "./CashFlowLine";

import { CashRegister } from "../../domain/entities/CashRegister";

interface CashFlowTableProps {
  registers: CashRegister[];
}

export const CashFlowTable: FC<CashFlowTableProps> = ({ registers }) => {
  const cashFlowLines = registers.map((register, index) => {
    return (
      <CashFlowLine
        code={index}
        description={register.description}
        date={register.date}
        value={register.value}
        type={register.type}
        key={index}
      />
    );
  });

  return (
    <table className="cash-flow-table">
      <thead className="cash-flow-table-head">
        <tr>
          <th className="cash-flow-table-head-column" id="date-head">
            Data
          </th>
          <th className="cash-flow-table-head-column" id="description-head">
            Descrição
          </th>
          <th className="cash-flow-table-head-column" id="value-head">
            Valor
          </th>
          <th className="cash-flow-table-head-column" id="type-head">
            Tipo
          </th>
        </tr>
      </thead>

      <tbody className="cash-flow-table-body">{cashFlowLines}</tbody>
    </table>
  );
};
