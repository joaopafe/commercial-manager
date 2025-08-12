import React, { useEffect, useMemo, useState } from "react";

import type { CashViewModelFactory } from "../../app/providers/di/CashViewModelFactory";

import { CashFlowTable } from "../components/CashFlowTable";
import { Loader } from "../components/Loader";

interface CashViewProps {
  cashViewModelFactory: CashViewModelFactory;
}

export const CashView: React.FC<CashViewProps> = ({ cashViewModelFactory }) => {
  const cashViewModel = useMemo(
    () => cashViewModelFactory.makeCashViewModel(),
    []
  );

  const [state, setState] = useState(cashViewModel.state);

  useEffect(() => {
    cashViewModel.stateListener = setState;

    return () => {
      cashViewModel.stateListener = null;
    };
  });

  useEffect(() => {
    cashViewModel.getAllInformations();
  }, []);

  const totalEntries = state.isSearchingTotalEntries ? (
    <Loader />
  ) : state.isTotalEntriesNotFound ? (
    <div className="information-value">Entradas não encontradas</div>
  ) : (
    <div className="information-value">R$ {state.totalEntries}</div>
  );

  const totalOutputs = state.isSearchingTotalOutputs ? (
    <Loader />
  ) : state.isTotalOutputsNotFound ? (
    <div className="information-value">Saídas não encontradas</div>
  ) : (
    <div className="information-value">R$ {state.totalOutputs}</div>
  );

  const totalInCash = state.isSearchingTotalInCash ? (
    <Loader />
  ) : state.isTotalInCashNotFound ? (
    <div className="information-value">Caixa não encontrado</div>
  ) : (
    <div className="information-value">R$ {state.totalInCash}</div>
  );

  return (
    <div className="cash">
      <div className="message">Fluxo de Caixa</div>

      <div className="main-informations">
        <div className="information-card" id="total-entries">
          <div className="information-name">Entradas Totais</div>
          {totalEntries}
        </div>

        <div className="information-card" id="total-exits">
          <div className="information-name">Saídas Totais</div>
          {totalOutputs}
        </div>

        <div className="information-card" id="total-exits">
          <div className="information-name">Saldo Atual</div>
          {totalInCash}
        </div>
      </div>

      <div className="cash-flow">
        <div className="cash-flow-title">Registros de Transações</div>

        {state.isSearchingAllRegisters && <Loader />}

        {state.allRegisters && <CashFlowTable registers={state.allRegisters} />}

        {state.isAllRegistersNotFound && (
          <div id="registers-not-found">Transações não encontradas</div>
        )}
      </div>
    </div>
  );
};
