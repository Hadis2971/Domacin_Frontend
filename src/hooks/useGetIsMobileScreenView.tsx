import { useState, useEffect } from "react";

const MOBILE_SCREEN_WIDTH = 768;

const useGetIsMobileScreenView = () => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_SCREEN_WIDTH
  );

  useEffect(() => {
    const handleWindowResizeEvent = () => {
      setIsMobile(window.innerWidth <= MOBILE_SCREEN_WIDTH);
    };

    window.addEventListener("resize", handleWindowResizeEvent);

    return () => {
      window.removeEventListener("resize", handleWindowResizeEvent);
    };
  }, []);

  return isMobile;
};

export default useGetIsMobileScreenView;
