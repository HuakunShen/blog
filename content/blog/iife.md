---
title: IIFE
author: HK
tags: [Web, JavaScript]
date: 2024-06-09
---

https://developer.mozilla.org/en-US/docs/Glossary/IIFE

An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.

Immediately Invoked Function Expression (IIFE) 是 JavaScript 中的一种常见的设计模式，它是一个立即执行的匿名函数表达式。IIFE 通常用于创建一个独立的作用域，避免变量污染全局作用域。

```js
(function () {
  // …
})();

(() => {
  // …
})();

(async () => {
  // …
})();
```

IIFE is usually used to create a separate scope to avoid polluting the global scope. In this blog I will instead talk about the use of IIFE in hosting web pages.

Traditionally, static websites are compiled into an `index.html` file as an entrypoint. css and js files are linked in the `head` and `body` tags.

Here is an example of a simple `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue + TS</title>
    <script type="module" crossorigin src="/assets/index-D7F47PqG.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-DRBiz0Jz.css" />
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

You can see that in such a client-side rendered web page, the HTML file doesn't contain any content. The content is rendered by the JavaScript file linked in the `head` tag.

The `index.html` is only used as a container for the JavaScript file. The JavaScript file is responsible for rendering the content of the web page.

Theoretically, we can ship a single JavaScript file contains all the logic and content of the web page (including styles and images (png doesn't work, but svg does)).;

## Vite Config

For example, this is the original `vite.config.ts` file for a vue project:

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
```

Output `dist` folder:

```
dist
├── assets
│   ├── Vue.js_Logo_2.svg-BtIZHRhy.png
│   ├── index-CjgLCVzZ.css
│   └── index-CwnRthTM.js
├── index.html
└── vite.svg
```

Next, set output format to `iife`

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, "./src/main.ts"),
      output: {
        format: "iife",
        dir: path.resolve(__dirname, "./dist"),
        entryFileNames: "web.js",
      },
    },
  },
});
```

```
dist
├── assets
│   └── Vue.js_Logo_2.svg-BtIZHRhy.png
├── vite.svg
└── web.js
```

Now how to use the `web.js` without an `index.html` file?

Let's serve the `dist` folder with a simple http server:

```bash
serve dist --cors
```

The `web.js` is at `http://localhost:3000/web.js`

In an HTML file,

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <iframe></iframe>
    <script>
      fetch("http://localhost:3000/web.js", {
        method: "GET",
      })
        .then((res) => res.text())
        .then((data) => {
          document
            .querySelector("iframe")
            .contentDocument.write(
              "<div id='app'/><script>".concat(data, "<\/script>")
            );
        });
    </script>
  </body>
</html>
```

Here we are rendering the content of `web.js` in an `iframe`. It can also render the page directly as long as there is a `<div id="app" />`.

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <script>
      fetch("http://localhost:3000/web.js", {
        method: "GET",
      })
        .then((res) => res.text())
        .then((data) => {
          document.write(
            "<div id='app'></div><script>".concat(data, "<\/script>")
          );
        });
    </script>
  </body>
</html>
```

This is because the `main.ts` is like this

```ts
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

createApp(App).mount("#app");
```

So what can be the use case of this?

- The key benefit is that the website content doesn't have be to hosted on a server. It can be saved in a database and fetched by the client like a function.
