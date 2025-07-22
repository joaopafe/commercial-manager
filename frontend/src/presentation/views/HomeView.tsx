import React, { useEffect, useMemo, useState } from "react";

import type { HomeViewModelFactory } from "../../app/providers/di/HomeViewModelFactory";

import { SaleTable } from "../components/SaleTable";
import { Loader } from "../components/Loader";

interface HomeViewProps {
  homeViewModelFactory: HomeViewModelFactory;
}

export const HomeView: React.FC<HomeViewProps> = ({ homeViewModelFactory }) => {
  const homeViewModel = useMemo(
    () => homeViewModelFactory.makeHomeViewModel(),
    []
  );

  const [state, setState] = useState(homeViewModel.state);

  useEffect(() => {
    homeViewModel.stateListener = setState;

    return () => {
      homeViewModel.stateListener = null;
    };
  });

  useEffect(() => {
    homeViewModel.getAllInformations();
  }, []);

  const todaySales = state.isSearchingTodaySales ? (
    <Loader />
  ) : state.isTodaySalesNotFound ? (
    <div className="information-value">Vendas não encontradas</div>
  ) : (
    <div className="information-value">R$ {state.todaySales}</div>
  );

  const totalInCash = state.isSearchingTotalInCash ? (
    <Loader />
  ) : state.isTotalInCashNotFound ? (
    <div className="information-value">Caixa não encontrado</div>
  ) : (
    <div className="information-value">R$ {state.totalInCash}</div>
  );

  return (
    <div className="home">
      <div className="message">Bem-vindo, Usuário</div>

      <div className="main-informations">
        <div className="information-card" id="sales-today">
          <div className="information-name">Vendas Hoje</div>
          {todaySales}
        </div>

        <div className="information-card" id="cash">
          <div className="information-name">Total em caixa</div>
          {totalInCash}
        </div>
      </div>

      <div className="last-sales">
        <div className="last-sales-title">Últimas vendas</div>

        {state.isSearchingLatestSales && <Loader />}

        {state.latestSales && <SaleTable sales={state.latestSales} />}

        {state.isLatestSalesNotFound && (
          <div id="latest-sales-not-found">Vendas não encontradas</div>
        )}
      </div>
    </div>
  );
};
