import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [reactRouter()],
  // Use base only for GitHub Pages, not local dev
  base: process.env.GITHUB_PAGES ? "/testdeploy/" : "/",
});