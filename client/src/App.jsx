import { useEffect } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import "./App.css";
import useAuthStore from "./store/useAuthStore";
import useChatStore from "./store/useChatStore";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const { initializeSocket, disconnectSocket } = useChatStore();
  const { theme } = useTheme();

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
      <Toaster
        visibleToasts={5}
        theme={theme === "dark" ? "light" : "dark"}
        position="bottom-right"
      />
      <Outlet />
    </>
  );
}

export default App;
