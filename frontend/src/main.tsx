import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "./global.css";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import App from "./App.tsx";
import Library from "./Library.tsx";
import AuthLogin from "./AuthLogin.tsx";
import AuthSignup from "./AuthSignup.tsx";
import Shows from "./Shows.tsx";
import FullContent from "./FullContent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/library",
    Component: () => {
      return (
        <ProtectedRoute>
          <Library />
        </ProtectedRoute>
      );
    },
  },
  {
    path: "/shows",
    Component: () => {
      return (
        <ProtectedRoute>
          <Shows />
        </ProtectedRoute>
      );
    },
  },
  {
    path: "/Login",
    Component: AuthLogin,
  },
  {
    path: "/Signup",
    Component: AuthSignup,
  },
  {
    path: "shows/:malId",
    Component: FullContent,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
