import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeView } from "../../presentation/views/HomeView";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
      </Routes>
    </BrowserRouter>
  );
};
