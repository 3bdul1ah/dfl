import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { stringify } from "yaml";
import { readContent } from "../src/lib/content/load.mjs";

export async function contentFixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "research-content-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "website_content"), { recursive: true });
  await mkdir(path.join(root, "assets"), { recursive: true });
  await writeFile(
    path.join(root, "assets/logo.png"),
    Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j6V8AAAAASUVORK5CYII=",
      "base64",
    ),
  );
  await writeFile(
    path.join(root, "assets/clip with spaces.mp4"),
    "test video bytes",
  );
  const content = await readContent();
  function replaceMedia(value, key) {
    if (!value || typeof value !== "object") return;
    if (Object.hasOwn(value, "path"))
      value.path =
        key === "video" ? "assets/clip with spaces.mp4" : "assets/logo.png";
    for (const [childKey, child] of Object.entries(value))
      replaceMedia(child, childKey);
  }
  replaceMedia(content);
  async function save() {
    for (const [name, value] of Object.entries(content))
      await writeFile(
        path.join(root, "website_content", `${name}.yaml`),
        stringify(value),
      );
  }
  await save();
  return { root, content, save };
}
