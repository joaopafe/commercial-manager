import { Routes, Route } from "react-router-dom";

import { HomeView } from "../../presentation/views/HomeView";
import { PartsManagerView } from "../../presentation/views/PartsManagerView";
import { StockView } from "../../presentation/views/StockView";
import { SuppliersManagerView } from "../../presentation/views/SuppliersManagerView";
import { CustomersManagerView } from "../../presentation/views/CustomersManagerView";

import { HomeViewModelFactory } from "../providers/di/HomeViewModelFactory";
import { PartsManagerViewModelFactory } from "../providers/di/PartsManagerViewModelFactory";
import { StockViewModelFactory } from "../providers/di/StockViewModelFactory";
import { SuppliersManagerViewModelFactory } from "../providers/di/SuppliersManagerViewModelFactory";
import { CustomersManagerViewModelFactory } from "../providers/di/CustomersManagerViewModelFactory";

const homeViewModelFactory = new HomeViewModelFactory();
const partsManagerViewModelFactory = new PartsManagerViewModelFactory();
const stockViewModelFactory = new StockViewModelFactory();
const suppliersManagerViewModelFactory = new SuppliersManagerViewModelFactory();
const customersManagerViewModelFactory = new CustomersManagerViewModelFactory();

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomeView homeViewModelFactory={homeViewModelFactory} />}
      />
      <Route
        path="/parts-manager"
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
        path="/suppliers-manager"
        element={
          <SuppliersManagerView
            supplierManagerViewModelFactory={suppliersManagerViewModelFactory}
          />
        }
      />
      <Route
        path="customers-manager"
        element={
          <CustomersManagerView
            customerManagerViewModelFactory={customersManagerViewModelFactory}
          />
        }
      />
    </Routes>
  );
};
