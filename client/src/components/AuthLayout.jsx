import { Navigate, Outlet, useLocation } from "react-router";
import useAuthStore from "../store/useAuthStore";

function AuthLayout({ requireAuth }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation(); // Get the current location object

  // Protect routes that require authentication
  if (requireAuth && !isAuthenticated) {
    // Redirect unauthenticated users to /signin and store the current location (including search params)
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Redirect authenticated users accessing public routes
  if (!requireAuth && isAuthenticated) {
    // Check if there's a stored "from" location in state
    const lastVisitedRoute = location.state?.from
      ? `${location.state.from.pathname}${location.state.from.search || ""}`
      : "/home";
    return <Navigate to={lastVisitedRoute} replace />;
  }

  // Render child routes if no redirection is needed
  return <Outlet />;
}

export default AuthLayout;
