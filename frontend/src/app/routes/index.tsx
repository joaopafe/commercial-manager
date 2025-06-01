import { Routes, Route } from "react-router-dom";

import { HomeView } from "../../presentation/views/HomeView";
import { PartsManagerView } from "../../presentation/views/PartsManagerView";

import { HomeViewModelFactory } from "../providers/di/HomeViewModelFactory";
import { PartsManagerViewModelFactory } from "../providers/di/PartsManagerViewModelFactory";

const homeViewModelFactory = new HomeViewModelFactory();
const partsManagerViewModelFactory = new PartsManagerViewModelFactory();

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
    </Routes>
  );
};
