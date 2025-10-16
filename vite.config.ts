import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [reactRouter()],
  // Use relative base for GitHub Pages to fix asset loading
  base: process.env.GITHUB_PAGES ? "./" : "/",
});