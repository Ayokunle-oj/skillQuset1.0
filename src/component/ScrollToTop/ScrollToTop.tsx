import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop — resets the window scroll position to the top
 * whenever the route changes.
 *
 * Already wired into App.tsx — just uncomment the line:
 *   <ScrollToTop />
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
