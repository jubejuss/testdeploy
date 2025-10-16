import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: false,
  async prerender() {
    return["/", "/users", "/users/1", "/users/2", "/users/3"]
  }
} satisfies Config;