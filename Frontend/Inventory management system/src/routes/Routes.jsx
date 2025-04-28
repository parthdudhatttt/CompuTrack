import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import { Dashboard, History, ProductOverview, Products, Report, WarehouseOverview, WarehouseProductOverview, ErrorBoundary } from "../pages";
import { Login, Register } from "../components";
import Auth from "../components/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        path: "/",
        element: (
          //<AuthLayout authentication = {false}>
          <Dashboard />
          //</AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          //<AuthLayout authentication = {false} restricted={true}>
          <Login />
          //</AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          //<AuthLayout authentication = {false} restricted={true}>
          <Register />
          //</AuthLayout>
        ),
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/report",
        element: <Report />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/warehouse/:id",
        element: <WarehouseOverview />,
      },
      {
        path: "/warehouse-product/:id",
        element: <WarehouseProductOverview />,
      },
      {
        path: "/product/:productNo",
        element: <ProductOverview />,
      }
    ],
  },
]);

export default router;
