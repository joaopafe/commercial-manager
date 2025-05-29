import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";

import "./presentation/style/reset.css";
import "./presentation/style/root.css";
import "./presentation/style/aside.css";
import "./presentation/style/home.css";
import "./presentation/style/parts-manager.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
