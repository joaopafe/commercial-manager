import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeView } from "../../presentation/views/HomeView";

import { HomeViewModelFactory } from "../providers/di/HomeViewModelFactory";

const homeViewModelFactory = new HomeViewModelFactory();

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomeView homeViewModelFactory={homeViewModelFactory} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
