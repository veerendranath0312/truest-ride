import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig((command, mode) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    server: {
      proxy: {
        // "/socket.io": {
        //   target: "http://127.0.0.1:5000",
        //   ws: true,
        //   changeOrigin: true,
        // },
        "/api": {
          target: env.VITE_CORS_ORIGINS, // Backend server
          changeOrigin: true, // Change the origin of the request to match the target
        },
        allowedHosts: ["cassini.cs.kent.edu", "truestride.kentcs.org"],
      },
    },
  };
});
