import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { content } from "./plugins/vite-plugin-content";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    content(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
