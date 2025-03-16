import { useEffect } from "react";
import { Outlet } from "react-router";
import "./App.css";
import useAuthStore from "./store/useAuthStore";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth(); // Validate token on app load
  }, [checkAuth]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
