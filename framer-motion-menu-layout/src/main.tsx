import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./Root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route
        path="home"
        element={
          <div className="py-10 px-10 text-blue-600 font-semibold content-active">
            Home Contents
          </div>
        }
      ></Route>
      <Route
        path="menu1"
        element={
          <div className="py-10 px-10 text-blue-600 font-semibold content-active">
            Menu1 Contents
          </div>
        }
      ></Route>
      <Route
        path="menu2"
        element={
          <div className="py-10 px-10 text-blue-600 font-semibold content-active">
            Menu2 Contents
          </div>
        }
      ></Route>
      <Route
        path="menu3"
        element={
          <div className="py-10 px-10 text-blue-600 font-semibold content-active">
            Menu3 Contents
          </div>
        }
      ></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
