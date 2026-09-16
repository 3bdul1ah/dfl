import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compileContent } from "./src/lib/content/load.mjs";
import { contentPlugin } from "./scripts/content-plugin.mjs";

export default defineConfig(async () => {
  const { content } = await compileContent();
  return {
    base: content.site.base,
    plugins: [react(), contentPlugin(content)],
  };
});
