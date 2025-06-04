import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";

import "./presentation/style/reset.css";
import "./presentation/style/root.css";
import "./presentation/style/loader.css";
import "./presentation/style/aside.css";
import "./presentation/style/home.css";
import "./presentation/style/parts-manager.css";
import "./presentation/style/stock.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
