import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout/Layout";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Articles from "./pages/Articles/Articles";

import useGetIsMobileScreenView from "./hooks/useGetIsMobileScreenView";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
