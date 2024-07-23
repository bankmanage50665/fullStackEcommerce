import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./shared/Navigation/RootLayout";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { index: true, element: <h1>Home page </h1> },
      { path: "about", element: <h1>About page</h1> },
      { path: "contact", element: <h1>Contact page</h1> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
