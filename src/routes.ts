import type { RouteConfig } from "@react-router/dev/routes";
import { index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  layout("layouts/layout.tsx", [
    index("pages/home.tsx"),
    route("users", "pages/users.tsx", [
      route(":userId", "pages/user.tsx"),
    ]),
  ]),
  route("*", "pages/no-match.tsx"),
] satisfies RouteConfig;