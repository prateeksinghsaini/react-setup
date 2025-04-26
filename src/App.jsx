import React, { Suspense } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { useSelector } from "react-redux";
import PageNotFound from "./screens/PageNotFound";

function App() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const Screen = ({ Name }) => {
    return (
      <Suspense
        fallback={
          <img src="/images/logo.png" alt="loading" className="h-20 w-20" />
        }
      >
        <Name />
      </Suspense>
    );
  };

  const protectedRoutes = [
    {
      path: "/",
      element: <Screen Name={MainLayout} />,
      children: [{ path: "", element: <Screen Name={Home} /> }],
    },
    {
      path: "*",
      element: <Screen Name={PageNotFound} />,
    },
  ];

  const routes = [
    {
      path: "/",
      element: <Screen Name={Login} />,
    },
    {
      path: "*",
      element: <Screen Name={PageNotFound} />,
    },
  ];

  const router = createBrowserRouter(!user ? routes : protectedRoutes);

  return <RouterProvider router={router} />;
}

export default App;
