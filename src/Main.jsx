import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Layout from "./pages/Layout";
import ManageMenu from "./pages/ManageMenu";
import ManageOrders from "./pages/ManageOrders";
import OrderDetails from "./pages/OrderDetails";
import CompletedOrders from "./pages/CompletedOrders";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <ManageMenu />,
            },
            {
                path: "pedidos",
                element: <ManageOrders />,
            },
            {
                path: "pedidos/:orderId",
                element: <OrderDetails />,
            },
            {
                path: "pedidos-concluidos",
                element: <CompletedOrders />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
