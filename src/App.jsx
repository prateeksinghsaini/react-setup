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

const Screen = ({ name }) => {
  return (
    <Suspense
      fallback={
        <image src="/images/logo.png" alt="loading" className="h-20 w-20" />
      }
    >
      {name}
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Screen name={<MainLayout />} />,
    children: [{ path: "", element: <Screen name={<Home />} /> }],
  },
  {
    path: "/login",
    element: <Screen name={<Login />} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
