import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { useSelector } from "react-redux";
import PageNotFound from "./screens/PageNotFound";

function App() {
  const user = useSelector((state) => state.auth.user);

  const allRoutes = {
    protectedRoutes: [
      {
        path: "/",
        element: MainLayout,
        children: [{ path: "", element: Home }],
      },
      {
        path: "*",
        element: PageNotFound,
      },
    ],
    publicRoutes: [
      {
        path: "/",
        element: Login,
      },
      {
        path: "*",
        element: PageNotFound,
      },
    ],
  };

  const getRoutes = (routes) => {
    return routes.map(({ path, element: Element, children }) => ({
      path,
      element: (
        <Suspense
          fallback={
            <img src="/images/logo.png" alt="loading" className="h-20 w-20" />
          }
        >
          <Element />
        </Suspense>
      ),
      children: children ? getRoutes(children) : undefined,
    }));
  };

  const router = createBrowserRouter(
    user
      ? getRoutes(allRoutes.protectedRoutes)
      : getRoutes(allRoutes.publicRoutes)
  );

  return <RouterProvider router={router} />;
}

export default App;
