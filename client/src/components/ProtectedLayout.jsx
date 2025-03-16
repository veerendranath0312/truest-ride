import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/useAuthStore";

function ProtectedLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // if the user is authenticated, render the child routes
  // otherwise, redirect to the landing page
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedLayout;
