import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { action, loader } from "./data/loaderAndAction";
import About from "./About";
import { useRegisterSW } from "virtual:pwa-register/react";
const intervalMS = 60 * 60 * 1000;

function ServiceWorker({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, intervalMS);
    },
  });
  return <>{children}</>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App></App>} loader={loader} action={action} />
      <Route path="/about" element={<About></About>}></Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ServiceWorker>
      <RouterProvider router={router} />
    </ServiceWorker>
  </React.StrictMode>
);
