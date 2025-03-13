import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import PublicLayout from "./layouts/public";
import { PublicRoutes } from "./routes/public_routes";
import AuthenticatedLayout from "./layouts/authenticated";
import { AuthenticatedRoutes } from "./routes/authenticated_routes";
import AdminLayout from "./layouts/admin";
import { AdminRoutes } from "./routes/admin_routes";
import HeadLayout from "./layouts/hr";
import { HeadRoutes } from "./routes/hr_routes";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <PublicLayout />
            </Suspense>
          }
        >
          {PublicRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>
        <Route
          path="/"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <AuthenticatedLayout />
            </Suspense>
          }
        >
          {AuthenticatedRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>
        <Route
          path="/"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <AdminLayout />
            </Suspense>
          }
        >
          {AdminRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>
        <Route
          path="/"
          element={
            <Suspense fallback={<p>loading...</p>}>
              <HeadLayout />
            </Suspense>
          }
        >
          {HeadRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
