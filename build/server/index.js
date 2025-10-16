import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, Meta, Links, ScrollRestoration, Scripts, NavLink, useLoaderData, Link, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const appStyles = "/testdeploy/assets/index-udZwS3RA.css";
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap"
}, {
  rel: "stylesheet",
  href: appStyles
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx("div", {
        id: "root",
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function Root() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const linkStyle = ({
  isActive
}) => ({
  fontWeight: isActive ? "bold" : "normal",
  marginRight: "1rem"
});
const layout = UNSAFE_withComponentProps(function Layout2() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "React Router 7 • React 19 • Framework Mode"
    }), /* @__PURE__ */ jsxs("nav", {
      style: {
        borderBottom: "solid 1px #ccc",
        paddingBottom: "1rem",
        marginBottom: "1rem"
      },
      children: [/* @__PURE__ */ jsx(NavLink, {
        to: "/",
        style: linkStyle,
        children: "Home"
      }), /* @__PURE__ */ jsx(NavLink, {
        to: "/users",
        style: linkStyle,
        children: "Users"
      })]
    }), /* @__PURE__ */ jsx("main", {
      style: {
        padding: "1rem 0"
      },
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layout
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = () => {
  return [{
    title: `Tiitel`
  }, {
    name: "description",
    content: `Piitel`
  }];
};
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h2", {
      children: "Home"
    }), /* @__PURE__ */ jsx("p", {
      children: "Welcome! Use the navigation above to explore the app."
    }), /* @__PURE__ */ jsxs("p", {
      children: [/* @__PURE__ */ jsx("strong", {
        children: "Now using Framework Mode!"
      }), " ✨"]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const USERS = [{
  id: "1",
  fullName: "Robin Wieruch"
}, {
  id: "2",
  fullName: "Sarah Finnley"
}, {
  id: "3",
  fullName: "Ada Lovelace"
}];
async function loader({
  request
}) {
  return {
    users: USERS
  };
}
const users = UNSAFE_withComponentProps(function Users() {
  const {
    users: users2
  } = useLoaderData();
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h2", {
      children: "Users"
    }), /* @__PURE__ */ jsx("ul", {
      style: {
        marginBottom: "1rem"
      },
      children: users2.map((user2) => /* @__PURE__ */ jsx("li", {
        children: /* @__PURE__ */ jsx(Link, {
          to: user2.id,
          children: user2.fullName
        })
      }, user2.id))
    }), /* @__PURE__ */ jsx(Outlet, {})]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: users,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = ({
  params
}) => {
  return [{
    title: `User ${params.userId}`
  }, {
    name: "description",
    content: `Profile page for user ${params.userId}`
  }];
};
const user = UNSAFE_withComponentProps(function User() {
  const {
    userId
  } = useParams();
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("h3", {
      children: ["User: ", userId]
    }), /* @__PURE__ */ jsx("div", {
      style: {
        display: "flex",
        gap: "0.75rem",
        marginBottom: "0.75rem"
      },
      children: /* @__PURE__ */ jsx(Link, {
        to: "/users",
        children: "Back to Users"
      })
    }), /* @__PURE__ */ jsxs("p", {
      children: ["This nested route is mounted under /users and matches /users/", userId, "."]
    }), /* @__PURE__ */ jsxs("p", {
      children: [/* @__PURE__ */ jsx("strong", {
        children: "Framework mode:"
      }), " Enhanced with meta tags! ✨"]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: user,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [{
    title: "404 - Page Not Found"
  }, {
    name: "description",
    content: "The page you're looking for doesn't exist."
  }];
};
const noMatch = UNSAFE_withComponentProps(function NoMatch() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("h2", {
      children: "404 — Not Found"
    }), /* @__PURE__ */ jsx("p", {
      children: "There's nothing here."
    }), /* @__PURE__ */ jsx(Link, {
      to: "/",
      children: "Go to Home"
    }), /* @__PURE__ */ jsxs("p", {
      children: [/* @__PURE__ */ jsx("strong", {
        children: "Framework mode:"
      }), " Now with proper 404 meta tags! ✨"]
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: noMatch,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/testdeploy/assets/entry.client-BzPPrKz8.js", "imports": ["/testdeploy/assets/chunk-OIYGIGL5-B0h15kU2.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/testdeploy/assets/root-CArOmm6T.js", "imports": ["/testdeploy/assets/chunk-OIYGIGL5-B0h15kU2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "layouts/layout": { "id": "layouts/layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/testdeploy/assets/layout-DekglgXJ.js", "imports": ["/testdeploy/assets/chunk-OIYGIGL5-B0h15kU2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/home": { "id": "pages/home", "parentId": "layouts/layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/testdeploy/assets/home-DfzL4KG1.js", "imports": ["/testdeploy/assets/chunk-OIYGIGL5-B0h15kU2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/users": { "id": "pages/users", "parentId": "layouts/layout", "path": "users", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/testdeploy/assets/users-oCCgZ984.js", "imports": ["/testdeploy/assets/chunk-OIYGIGL5-B0h15kU2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/user": { "id": "pages/user", "parentId": "pages/users", "path": ":userId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/testdeploy/assets/user-DugsJtRO.js", "imports": ["/testdeploy/assets/chunk-OIYGIGL5-B0h15kU2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "pages/no-match": { "id": "pages/no-match", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/testdeploy/assets/no-match-BzOkmK--.js", "imports": ["/testdeploy/assets/chunk-OIYGIGL5-B0h15kU2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/testdeploy/assets/manifest-6fbfbc36.js", "version": "6fbfbc36", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/testdeploy/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = ["/", "/users", "/users/1", "/users/2", "/users/3"];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/testdeploy/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "layouts/layout": {
    id: "layouts/layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "pages/home": {
    id: "pages/home",
    parentId: "layouts/layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "pages/users": {
    id: "pages/users",
    parentId: "layouts/layout",
    path: "users",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "pages/user": {
    id: "pages/user",
    parentId: "pages/users",
    path: ":userId",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "pages/no-match": {
    id: "pages/no-match",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
