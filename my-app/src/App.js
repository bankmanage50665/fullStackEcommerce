import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./shared/Navigation/RootLayout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Products, {
  loader as productLoader,
} from "./components/Product/Products";
// import ProductsEdit from "./components/Product/ProductsEdit";
import AddProducts from "./components/Product/AddProducts";
import ProductLayout from "./shared/Navigation/ProductLayout";
import ProductItem, {
  loader as productDetailLoader,
} from "./components/Product/ProductItem";
import EditProducts from "./components/Product/EditProducts";
import { CartContextProvider } from "./context/CartContext";
import Cart from "./components/User/Cart";
import PlaceOrder, {
  loader as getProductLoader,
} from "./components/User/placeOrder";
import { action as logoutAction } from "./middleware/logout";
import {
  loader as getTokenLoader,
  checkAuthLoader,
} from "./middleware/getToken";
import LoginWith from "./components/LoginWith";
import Home from "./shared/component/Home";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    loader: getTokenLoader,
    id: "token",
    children: [
      { index: true, element: <Home/> },
      { path: "about", element: <h1>About page</h1> },
      { path: "signup", element: <Signup /> },

      { path: "login", element: <LoginWith /> },
      { path: "dasbord", element: <h1>Dasboard</h1> },
      {
        path: "products",
        element: <ProductLayout />,

        children: [
          {
            index: true,
            element: (
              <CartContextProvider>
                <Products />
              </CartContextProvider>
            ),
            loader: productLoader,
          },
          {
            path: "cart",
            element: (
              <CartContextProvider>
                <Cart />
              </CartContextProvider>
            ),
          },

          { path: "add", element: <AddProducts />, loader: checkAuthLoader },
          {
            path: ":id",
            loader: productDetailLoader,
            id: "product",
            children: [
              {
                index: true,
                element: <ProductItem />,
                loader: checkAuthLoader,
              },
              {
                path: "edit",
                element: <EditProducts />,
                loader: checkAuthLoader,
              },
            ],
          },
        ],
      },
      {
        path: "order",
        element: <PlaceOrder />,
        loader: getProductLoader,
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
