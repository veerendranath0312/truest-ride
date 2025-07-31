import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig((command, mode) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    assetsInclude: [
      "**/*.jpg",
      "**/*.JPG",
      "**/*.jpeg",
      "**/*.png",
      "**/*.svg",
      "**/*.gif",
      "**/*.webp",
      "**/*.ico",
      "**/*.pdf",
    ],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_CORS_ORIGINS, // Backend server
          changeOrigin: true, // Change the origin of the request to match the target
        },
      },
      allowedHosts: ["truestride.kentcs.org", "cassini.cs.kent.edu"],
    },
  };
});
