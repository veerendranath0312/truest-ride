import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * ScrollToTop component that scrolls the window to the top
 * whenever the pathname changes.
 *
 * This component utilizes the `useLocation` hook from
 * React Router to detect changes in the current URL path.
 * When the pathname changes, the `useEffect` hook triggers
 * a scroll to the top of the page.
 *
 * @returns {null} This component does not render anything to the DOM.
 */

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default ScrollToTop;
