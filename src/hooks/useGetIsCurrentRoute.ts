import { useLocation } from "react-router-dom";

const useGetIsCurrentRoute = (currentPathname: string): boolean => {
  const { pathname } = useLocation();

  return currentPathname === pathname;
};

export default useGetIsCurrentRoute;
