import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "./layout/Layout";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Articles from "./pages/Articles/Articles";

import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();

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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
