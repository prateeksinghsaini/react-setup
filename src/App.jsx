import React, { Suspense, useCallback, useMemo, useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { useSelector } from "react-redux";
import PageNotFound from "./screens/PageNotFound";
import Circle from "./components/Circle";
import { Toaster } from "react-hot-toast";

function App() {
  const user = useSelector((state) => state.auth.user);
  const rootRef = useRef();
  const mRef = useRef();

  const protectedRoutes = useMemo(() => [
    {
      path: "/",
      element: MainLayout,
      children: [{ path: "", element: Home }],
    },
    {
      path: "*",
      element: PageNotFound,
    },
  ], []);

  const publicRoutes = useMemo(() => [
    {
      path: "/",
      element: Login,
    },
    {
      path: "*",
      element: PageNotFound,
    },
  ], []);

  const wrapRoutes = useCallback((routes) => {
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
      children: children ? wrapRoutes(children) : undefined,
    }));
  }, []);

  const router = useMemo(() => {
    return createBrowserRouter(
      user ? wrapRoutes(protectedRoutes) : wrapRoutes(publicRoutes)
    );
  }, [user, protectedRoutes, publicRoutes, wrapRoutes]);

  const handleMouse = useCallback((e) => {
    const circle = mRef.current;
    if (circle) {
      setTimeout(() => {
        circle.style.left = `${e.clientX + 10}px`;
        circle.style.top = `${e.clientY - 10}px`;
      }, 20);
    }
  }, []);

  return (
    <div ref={rootRef} onMouseMove={handleMouse} className="relative overflow-hidden">
      <Circle ref={mRef} />
      <RouterProvider router={router} key={user ? "auth" : "guest"} />
      <Toaster />
    </div>
  );
}

export default App;
