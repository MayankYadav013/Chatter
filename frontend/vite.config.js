import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Vite default port, avoids conflict with backend
    proxy: {
      "/api": {
        target: "http://localhost:3001", // Match backend port
        changeOrigin: true,
      },
    },
  },
});