import react from "@vite/plugins-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 1000,
  },
});
