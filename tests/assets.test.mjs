import test from "node:test";
import assert from "node:assert/strict";
import { writeFile, readFile, symlink, readdir } from "node:fs/promises";
import path from "node:path";
import { compileContent } from "../src/lib/content/load.mjs";
import { contentFixture } from "./fixtures.mjs";

const build = (root) => compileContent({ root, env: {} });
test("YAML media is copied, deduplicated and given intrinsic image dimensions", async (t) => {
  const { root } = await contentFixture(t);
  const { content, count } = await build(root);
  assert.equal(count, 2);
  assert.equal(content.site.hero.logos[0].width, 1);
  const asset = content.simulation.video;
  assert(!asset.url.includes(" "));
  assert.equal(
    await readFile(path.join(root, "public", asset.url), "utf8"),
    "test video bytes",
  );
});
test("replacing bytes updates the URL and removes the obsolete copy", async (t) => {
  const { root } = await contentFixture(t);
  const before = await build(root);
  await writeFile(
    path.join(root, "assets/clip with spaces.mp4"),
    "replacement",
  );
  const after = await build(root);
  assert.notEqual(
    before.content.simulation.video.url,
    after.content.simulation.video.url,
  );
  assert.equal(
    (await readdir(path.join(root, "public/assets/media"))).length,
    2,
  );
});
test("missing assets report the section and field", async (t) => {
  const { root, content, save } = await contentFixture(t);
  content.experiments.experiments[0].video.path = "assets/missing.mp4";
  await save();
  await assert.rejects(
    build(root),
    /experiments\.experiments\[0\].video.path: file not found/,
  );
});
test("unresolved LFS pointers never become published media", async (t) => {
  const { root } = await contentFixture(t);
  await writeFile(
    path.join(root, "assets/clip with spaces.mp4"),
    "version https://git-lfs.github.com/spec/v1\noid sha256:abc\nsize 100\n",
  );
  await assert.rejects(build(root), /Git LFS pointer.*git lfs pull/);
});
test("paths and symlinks cannot escape the asset directory", async (t) => {
  const { root, content, save } = await contentFixture(t);
  await writeFile(path.join(root, "private.mp4"), "private");
  content.simulation.video.path = "assets/../private.mp4";
  await save();
  await assert.rejects(build(root), /must stay inside assets/);
  await symlink(
    path.join(root, "private.mp4"),
    path.join(root, "assets/linked.mp4"),
  );
  content.simulation.video.path = "assets/linked.mp4";
  await save();
  await assert.rejects(build(root), /must stay inside assets/);
});
test("invalid video aspect ratios fail with useful errors", async (t) => {
  const { root, content, save } = await contentFixture(t);
  content.simulation.video.aspectRatio = "16 / 0";
  await save();
  await assert.rejects(build(root), /aspectRatio: use positive dimensions/);
});
