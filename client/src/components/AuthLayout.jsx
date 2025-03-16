import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/useAuthStore";

function AuthLayout({ requireAuth }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Protect routes that require authentication
  // If the route requires authentication and the user is not authenticated, redirect to /signin
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Redirect routes that are not protected
  // If the route is public and the user is authenticated, redirect to the home page
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // Render child routes if no redirection is needed
  return <Outlet />;
}

export default AuthLayout;
