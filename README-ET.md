#Rakenduse muutmine staatiliseks.

**NB! Et rajad ehitataks erinevates serverites õigesti näitama, võib vajalik olla `ssr:false`** 
![urli errorid](./urlerror.png)

`react-router.config.ts` seadistame rajad. 
```ts
import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: true,
  async prerender() {
    return["/", "/users", "/users/1", "/users/2", "/users/3"]
  }
} satisfies Config;
```

Et urlid oleks leitavad suhtelisel rajal, tuleks `root.tsx`failis muuta css impordi viisi:
```tsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
// Regular import for development
// import "./app.css";  

// For usual stuff, import as usual `import "./styles/index.css"
// For static builds, import with ?url suffix if needed
import appStyles from "./styles/index.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect", 
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  // Add your CSS files here if using ?url imports:
  { rel: "stylesheet", href: appStyles },
];
```

**NB! Kontrollime, et oleks õiged skriptid**
```json
"scripts": {
    "dev": "react-router dev",
    "build": "react-router build",
    "start": "react-router-serve ./build/server/index.js",
    "typecheck": "react-router typegen && tsc"
  }
```
**NB! Et serve käsklus töötaks** tuleb installida `npm install @react-router/serve`

Kui endiselt esineb Manifesti ja linkide leidmise probleeme, võib nimetada src folderi ümber app folderiks, kuna react router ksutab sellist nimetamist.

##Docker deploy

Eeldab `Dockerfile` olemasolu:

```Dockerfile
FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:20-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]
```
Loo ka `.dockerignore` fail
```
.react-router
build
node_modules
README.md
```


```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

##Github deploy
