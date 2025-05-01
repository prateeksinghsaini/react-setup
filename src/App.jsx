import React, { Suspense, useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { useSelector } from "react-redux";
import PageNotFound from "./screens/PageNotFound";
import Circle from "./components/Circle";

function App() {
  const user = useSelector((state) => state.auth.user);
  const rootRef = useRef();
  const mRef = useRef();

  const protectedRoutes = [
    {
      path: "/",
      element: MainLayout,
      children: [{ path: "", element: Home }],
    },
    {
      path: "*",
      element: PageNotFound,
    },
  ];

  const publicRoutes = [
    {
      path: "/",
      element: Login,
    },
    {
      path: "*",
      element: PageNotFound,
    },
  ];

  const allRoutes = (routes) => {
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
      children: children ? allRoutes(children) : undefined,
    }));
  };

  const router = createBrowserRouter(
    user ? allRoutes(protectedRoutes) : allRoutes(publicRoutes)
  );

  const handleMouse = (e) => {
    const circle = mRef.current;
    setTimeout(() => {
      circle.style.left = `${e.clientX + 10}px`;
      circle.style.top = `${e.clientY - 10}px`;
    }, 20);
  };

  return (
    <div ref={rootRef} onMouseMove={handleMouse} className="relative">
      <Circle ref={mRef} />
      <RouterProvider router={router} key={user ? "auth" : "guest"} />
    </div>
  );
}

export default App;
