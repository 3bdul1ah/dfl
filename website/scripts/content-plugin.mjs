import path from "node:path";
import { compileContent } from "../src/lib/content/load.mjs";
import { schemas } from "../src/lib/content/schemas.mjs";
import { applyMetadata } from "../src/lib/content/metadata.mjs";

export function contentPlugin(initialContent) {
  let content = initialContent;
  return {
    name: "site-content",
    transformIndexHtml(html) {
      return applyMetadata(html, content.site);
    },
    configureServer(server) {
      if (server.config.server.watch === null) return;
      const root = server.config.root;
      const repositoryRoot = path.dirname(root);
      const contentFiles = new Set(
        Object.keys(schemas).map((name) =>
          path.join(repositoryRoot, `${name}.yaml`),
        ),
      );
      const assetsRoot = path.join(repositoryRoot, "assets") + path.sep;
      server.watcher.add([...contentFiles, assetsRoot]);
      let timer;
      let queue = Promise.resolve();
      const update = (file) => {
        if (!contentFiles.has(file) && !file.startsWith(assetsRoot)) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
          queue = queue.then(async () => {
            try {
              const result = await compileContent({ root: repositoryRoot });
              if (result.content.site.base !== content.site.base) {
                await server.restart();
                return;
              }
              content = result.content;
              const module = server.moduleGraph.getModuleById(
                path.join(root, "src/generated/content.json"),
              );
              if (module) server.moduleGraph.invalidateModule(module);
              server.ws.send({ type: "full-reload" });
            } catch (error) {
              server.config.logger.error(error.message);
              server.ws.send({
                type: "error",
                err: {
                  message: error.message,
                  stack: "",
                  plugin: "site-content",
                },
              });
            }
          });
        }, 120);
      };
      server.watcher
        .on("add", update)
        .on("change", update)
        .on("unlink", update);
      server.httpServer?.once("close", () => {
        clearTimeout(timer);
        server.watcher
          .off("add", update)
          .off("change", update)
          .off("unlink", update);
      });
    },
  };
}
