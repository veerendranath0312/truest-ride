import { useEffect } from "react";
import { Outlet } from "react-router";
import "./App.css";
import useAuthStore from "./store/useAuthStore";
import useChatStore from "./store/useChatStore";

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const { initializeSocket, disconnectSocket } = useChatStore();

  // Validate token on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Handle socket connection based on authentication state
  useEffect(() => {
    if (isAuthenticated) {
      initializeSocket();
      return () => {
        disconnectSocket();
      };
    }
  }, [isAuthenticated, initializeSocket, disconnectSocket]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
