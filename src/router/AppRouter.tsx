// AppRouter.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import routes from "./Routes";
import MainLayout from "../modules/MainLayout";
export default function AppRouter() {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <MainLayout>
              <Component />
            </MainLayout>
          }
        />
      ))}
    </Routes>
  );
}
