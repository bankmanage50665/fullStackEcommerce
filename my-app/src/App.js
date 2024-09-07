import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./shared/Navigation/RootLayout";
import Products, {
  loader as productLoader,
} from "./components/Product/Products";
import ProductItem, {
  loader as productDetailLoader,
} from "./components/Product/ProductItem";
import EditProducts from "./components/Product/EditProducts";
import { CartContextProvider } from "./context/CartContext";
import PlaceOrder, {
  loader as getProductLoader,
} from "./components/User/placeOrder";
import { action as logoutAction } from "./middleware/logout";
import {
  loader as getTokenLoader,
  checkAuthLoader,
} from "./middleware/getToken";
import Checkout from "./components/User/Checkout";
import UserOrders, {
  loader as userOrdersLoader,
} from "./components/User/UserOrder";
import GetAllUsers, {
  loader as allUserDetailLoader,
} from "./components/Admin/GetAllUsers";
import UserOrderDetailsForAdmin, {
  loader as userOrderDetailsForAdminLoader,
} from "./components/Admin/UserOrderDetailsForAdmin";
import AdminLayout from "./components/Admin/shared/Navigation/AdminLayout";
import Error from "./shared/component/Error";
import { Suspense } from "react";

const Signup = React.lazy(() => import("./components/Signup"));
const Login = React.lazy(() => import("./components/Login"));
const Cart = React.lazy(() => import("./components/User/Cart"));
const AddProducts = React.lazy(() =>
  import("./components/Product/AddProducts")
);

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <Error />,
    loader: getTokenLoader,
    id: "token",
    children: [
      { index: true, element: <Products />, loader: productLoader },
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
            element: <Products />,
            loader: productLoader,
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
        element: <Checkout />,
        loader: checkAuthLoader,
      },
      {
        path: "order",
        element: <PlaceOrder />,
        loader: getProductLoader,
      },
      { path: "logout", action: logoutAction },
      { path: "orders", element: <UserOrders />, loader: userOrdersLoader },

      {
        path: "admin",
        element: <AdminLayout />,
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <GetAllUsers />,
            loader: allUserDetailLoader,
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
