import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
  } from "react-router";
  
  import type { LinksFunction } from "react-router";
  import appStyles from "./styles/index.css?url";
  
  export const links: LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap",
    },
    { rel: "stylesheet", href: appStyles },
  ];
  
  export function Layout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <div id="root">
            {children}
          </div>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }
  
  export default function Root() {
    return <Outlet />;
  }