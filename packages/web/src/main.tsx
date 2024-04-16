import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

const router = createRouter({
  routeTree,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KindeProvider
      audience={import.meta.env.VITE_APP_KINDE_AUDIENCE}
      clientId="eca349faf9d44004b2c5a06682fdeced"
      domain="https://breadscorner.kinde.com"
      logoutUri={window.location.origin}
      redirectUri={window.location.origin}
    >
      <RouterProvider router={router} />
    </KindeProvider>
  </React.StrictMode>
);
