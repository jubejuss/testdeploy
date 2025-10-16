import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: !process.env.GITHUB_PAGES,
  basename: process.env.GITHUB_PAGES ? "/testdeploy" : "/",
  async prerender() {
    return["/", "/users", "/users/1", "/users/2", "/users/3"]
  }
} satisfies Config;