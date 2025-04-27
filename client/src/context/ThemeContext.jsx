import { createContext, useContext, useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }) {
  const { isAuthenticated } = useAuthStore();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    if (isAuthenticated) {
      // Use stored theme preference for authenticated users
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    } else {
      // Default to dark theme when not authenticated
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, [theme, isAuthenticated]);

  const toggleTheme = () => {
    if (isAuthenticated) {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }
  };

  // Return actual theme value if authenticated, otherwise return dark
  const currentTheme = isAuthenticated ? theme : "dark";

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
