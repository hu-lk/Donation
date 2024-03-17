import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import App from "./App.jsx";
import "./index.css";

//routes
import Login from "./screens/auth/Login.jsx";
import Register from "./screens/auth/Register.jsx";
import Dashboard from "./screens/dashboard/Dashboard.jsx";
import Payment from "./screens/payment/Payment.jsx";

const router = createBrowserRouter([
  {
    path: "/", // This is the root path
    element: <App />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/user/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/user/payment",
    element: <Payment />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router}>
        {/* Wrap the entire application inside RouterProvider */}
        <App />
      </RouterProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
