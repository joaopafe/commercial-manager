import { AppRoutes } from "./routes";

import { Aside } from "../presentation/layouts/Aside";

export const App = () => {
  return (
    <>
      <Aside />
      <AppRoutes />
    </>
  );
};
