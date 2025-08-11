import { CashFlowTable } from "../components/CashFlowTable";

export const CashView = () => {
  return (
    <div className="cash">
      <div className="header">
        <div className="message">Fluxo de Caixa</div>

        <div className="total-in-cash">Total em Caixa: R$ 5.000,00</div>
      </div>

      <div className="main-informations">
        <div className="information-card" id="total-entries">
          <div className="information-name">Entradas Totais</div>
          <div className="information-value">R$ 4.500,00</div>
        </div>

        <div className="information-card" id="total-exits">
          <div className="information-name">Saídas Totais</div>
          <div className="information-value">R$ 3.800,00</div>
        </div>

        <div className="information-card" id="total-exits">
          <div className="information-name">Saldo Atual</div>
          <div className="information-value">R$ 700,00</div>
        </div>
      </div>

      <div className="cash-flow">
        <div className="cash-flow-title">Registros de Transações</div>

        <CashFlowTable
          registers={[
            {
              date: new Date(),
              description: "2X Óleo 15W40",
              value: 60,
              type: "Entrada",
            },
            {
              date: new Date(),
              description: "2X Óleo 15W40",
              value: 60,
              type: "Entrada",
            },
            {
              date: new Date(),
              description: "2X Óleo 15W40",
              value: 60,
              type: "Entrada",
            },
            {
              date: new Date(),
              description: "2X Óleo 15W40",
              value: 60,
              type: "Entrada",
            },
            {
              date: new Date(),
              description: "2X Óleo 15W40",
              value: 60,
              type: "Entrada",
            },
          ]}
        />
      </div>
    </div>
  );
};
