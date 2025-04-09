import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      // "/socket.io": {
      //   target: "http://127.0.0.1:5000",
      //   ws: true,
      //   changeOrigin: true,
      // },
      "/api": {
        target: "http://127.0.0.1:5000/", // Backend server
        changeOrigin: true, // Change the origin of the request to match the target
      },
    },
  },
});
