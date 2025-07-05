import { Routes, Route } from "react-router-dom";

import { HomeView } from "../../presentation/views/HomeView";
import { PartsManagerView } from "../../presentation/views/PartsManagerView";
import { StockView } from "../../presentation/views/StockView";
import { SuppliersManagerView } from "../../presentation/views/SuppliersManagerView";

import { HomeViewModelFactory } from "../providers/di/HomeViewModelFactory";
import { PartsManagerViewModelFactory } from "../providers/di/PartsManagerViewModelFactory";
import { StockViewModelFactory } from "../providers/di/StockViewModelFactory";
import { SuppliersManagerViewModelFactory } from "../providers/di/SuppliersManagerViewModelFactory";

const homeViewModelFactory = new HomeViewModelFactory();
const partsManagerViewModelFactory = new PartsManagerViewModelFactory();
const stockViewModelFactory = new StockViewModelFactory();
const suppliersManagerViewModelFactory = new SuppliersManagerViewModelFactory();

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomeView homeViewModelFactory={homeViewModelFactory} />}
      />
      <Route
        path="/partsmanager"
        element={
          <PartsManagerView
            partsManagerViewModelFactory={partsManagerViewModelFactory}
          />
        }
      />
      <Route
        path="/stock"
        element={<StockView stockViewModelFactory={stockViewModelFactory} />}
      />
      <Route
        path="/suppliersmanager"
        element={
          <SuppliersManagerView
            supplierManagerViewModelFactory={suppliersManagerViewModelFactory}
          />
        }
      />
    </Routes>
  );
};
