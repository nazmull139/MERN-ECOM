import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
import { useLocation } from "react-router-dom";

const pixelId = "1618221415542827"; // Your actual Pixel ID

const FacebookPixel = () => {
  const location = useLocation(); // Get the current route

  useEffect(() => {
    ReactPixel.init(pixelId);  // Initialize Facebook Pixel
    ReactPixel.pageView();      // Track page view on first load
  }, []);

  useEffect(() => {
    ReactPixel.pageView();  // Track route changes in SPA
  }, [location.pathname]);

  return null; // This component does not render anything
};

export default FacebookPixel;
