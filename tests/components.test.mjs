import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { prepareAssets } from "../scripts/prepare-assets.mjs";

test("a YAML experiment becomes a React card with a same-site video URL", async () => {
  const { manifest } = await prepareAssets();
  const server = await createServer({
    server: { middlewareMode: true, hmr: false, ws: false, watch: null },
    appType: "custom",
  });
  try {
    const { default: Experiments } = await server.ssrLoadModule(
      "/src/components/Experiments.jsx",
    );
    const added = {
      ...manifest.experiments[0],
      id: "new-entry",
      title: "New & additional experiment",
      description: "The added YAML content.",
    };
    const html = renderToStaticMarkup(
      createElement(Experiments, {
        experiments: [...manifest.experiments, added],
      }),
    );
    assert.equal(
      (html.match(/class="exp-card"/g) || []).length,
      manifest.experiments.length + 1,
    );
    assert(html.includes("New &amp; additional experiment"));
    assert(html.includes("The added YAML content."));
    assert(html.includes('src="/dfl/assets/media/'));
    assert(!html.includes("releases/download"));
  } finally {
    await server.close();
  }
});
