import React, { lazy } from "react";
import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import { CartContextProvider } from "./context/CartContext";

import { action as logoutAction } from "./middleware/logout";
import RootLayout from "./shared/Navigation/RootLayout";
import ProductItem, {
  loader as productDetailLoader,
} from "./components/Product/ProductItem";
import EditProducts from "./components/Product/EditProducts";

import {
  loader as getTokenLoader,
  checkAuthLoader,
} from "./middleware/getToken";

import UserOrderDetailsForAdmin, {
  loader as userOrderDetailsForAdminLoader,
} from "./components/Admin/UserOrderDetailsForAdmin";
import AdminLayout from "./components/Admin/shared/Navigation/AdminLayout";
import Error from "./shared/component/Error";

const Signup = React.lazy(() => import("./components/Signup"));
const Login = React.lazy(() => import("./components/Login"));
const Cart = React.lazy(() => import("./components/User/Cart"));
const AddProducts = React.lazy(() =>
  import("./components/Product/AddProducts")
);

const Products = lazy(() => import("./components/Product/Products"));
const UserOrders = lazy(() => import("./components/User/UserOrder"));
const GetAllUsers = lazy(() => import("./components/Admin/GetAllUsers"));
const Checkout = lazy(() => import("./components/User/Checkout"));

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <Error />,
    loader: getTokenLoader,
    id: "token",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="center">Loading...</div>}>
            <Products />
          </Suspense>
        ),
        loader: () =>
          import("./components/Product/Products").then((module) =>
            module.loader()
          ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Signup />
          </Suspense>
        ),
      },

      {
        path: "login",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "products",

        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<div className="center">Loading...</div>}>
                <Products />
              </Suspense>
            ),
            loader: () =>
              import("./components/Product/Products").then((module) =>
                module.loader()
              ),
          },
          {
            path: "cart",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Cart />
              </Suspense>
            ),
          },

          {
            path: ":id",
            loader: productDetailLoader,
            id: "product",
            children: [
              {
                index: true,
                element: <ProductItem />,
                loader: productDetailLoader,
              },
              {
                path: "edit",
                element: <EditProducts />,
              },
            ],
          },
        ],
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<p className="center">Loading...</p>}>
            <Checkout />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },

      { path: "logout", action: logoutAction },
      {
        path: "orders",
        element: (
          <Suspense fallback={<p className="center">Loading</p>}>
            <UserOrders />
          </Suspense>
        ),
        loader: () =>
          import("./components/User/UserOrder").then((module) =>
            module.loader()
          ),
      },

      {
        path: "admin",
        element: <AdminLayout />,
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p className="center">Loading...</p>}>
                <GetAllUsers />
              </Suspense>
            ),
            loader: () =>
              import("./components/Admin/GetAllUsers").then((module) =>
                module.loader()
              ),
          },
          { path: "add", element: <AddProducts /> },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <UserOrderDetailsForAdmin />,
                loader: userOrderDetailsForAdminLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </>
  );
}

export default App;
