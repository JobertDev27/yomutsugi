import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "./styles/global.css";
import Library from "./Library.tsx";
import AuthLogin from "./AuthLogin.tsx";
import AuthSignup from "./AuthSignup.tsx";
import Shows from "./Shows.tsx";
import FullContent from "./FullContent.tsx";
import SessionProvider from "./utils/SessionProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Shows,
  },
  {
    path: "/library",
    Component: Library,
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
    path: "/:malId",
    Component: FullContent,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
);
