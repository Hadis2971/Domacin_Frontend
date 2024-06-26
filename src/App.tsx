import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "./layout/Layout";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import ShopCategory from "./pages/ShopCategory/ShopCategory";
import Articles from "./pages/Articles/Articles";
import ArticlesCategory from "./pages/ArticlesCategory/ArticlesCategory";

import ProductsContext from "./state/Products";

import "bootstrap/dist/css/bootstrap.min.css";
import useWebsockets from "./http/useWebsockets";
import { useEffect } from "react";

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
        path: "/shop/:category",
        element: <ShopCategory />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/articles/:category",
        element: <ArticlesCategory />,
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
  const { connectWebsockets, disconnectWebsockets, getSocketReadyState } =
    useWebsockets();

  useEffect(() => {
    console.log(
      "getSocketReadyStategetSocektReadyStategetSocketReadyState",
      getSocketReadyState()
    );

    if (!getSocketReadyState()) connectWebsockets();

    return () => disconnectWebsockets();
  }, []);

  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <ProductsContext>
  //       <RouterProvider router={router} />
  //     </ProductsContext>
  //   </QueryClientProvider>
  // );

  return <RouterProvider router={router} />;
}

export default App;
