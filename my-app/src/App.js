import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./shared/Navigation/RootLayout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProductLayout from "./shared/Navigation/ProductLayout";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <h1>Home page </h1> },
      { path: "about", element: <h1>About page</h1> },
      { path: "signup", element: <Login /> },
      {
        path: "products",
        element: <ProductLayout />,
        children: [
          { index: true, element: <h1>Products page </h1> },
          { path: "add", element: <h2>Add products</h2> },
          { path: ":id/edit", element: <h2>Edit products</h2> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
