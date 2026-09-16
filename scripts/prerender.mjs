import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

// Keep the original site's content, anchor links and media usable without JS.
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false, watch: null },
  appType: "custom",
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const html = await readFile("dist/index.html", "utf8");
  if (!html.includes('<div id="root"></div>'))
    throw new Error("Missing prerender root.");
  await writeFile(
    "dist/index.html",
    html.replace(
      '<div id="root"></div>',
      () => `<div id="root">${renderToString(createElement(App))}</div>`,
    ),
  );
  await writeFile("dist/.nojekyll", "");
  async function size(directory) {
    let total = 0;
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      total += entry.isDirectory() ? await size(file) : (await stat(file)).size;
    }
    return total;
  }
  const bytes = await size("dist");
  if (bytes > 1_000_000_000)
    throw new Error("Built site exceeds the GitHub Pages 1 GB limit.");
  console.log(
    `Prerendered React page. Complete deployment: ${(bytes / 1_000_000).toFixed(1)} MB.`,
  );
} finally {
  await server.close();
}
