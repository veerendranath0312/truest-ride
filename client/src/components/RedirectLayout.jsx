import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/useAuthStore";

function RedirectLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // if the user is authenticated, redirect to the home page
  // otherwise, render the child routes
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}

export default RedirectLayout;
