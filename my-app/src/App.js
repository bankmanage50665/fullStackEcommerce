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

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <h1>Home page </h1> },
      { path: "about", element: <h1>About page</h1> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
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

          { path: "add", element: <AddProducts /> },
          {
            path: ":id",
            loader: productDetailLoader,
            id: "product",
            children: [
              { index: true, element: <ProductItem /> },
              { path: ":id/edit", element: <EditProducts /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
