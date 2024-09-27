import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { robots } from "vite-plugin-robots";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/claude-artifact-runner",
  plugins: [react(), robots()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      src: path.resolve(__dirname, "./src"),
    },
  },
});
