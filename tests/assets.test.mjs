import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  rm,
  symlink,
  readdir,
} from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { stringify } from "yaml";
import { prepareAssets } from "../scripts/prepare-assets.mjs";

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "dfl-assets-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "assets"), { recursive: true });
  await writeFile(
    path.join(root, "assets/logo.png"),
    Buffer.from("image fixture"),
  );
  await writeFile(
    path.join(root, "assets/clip with spaces.MP4"),
    Buffer.from("video fixture"),
  );
  const image = { path: "assets/logo.png", alt: "Logo" };
  const video = { path: "assets/clip with spaces.MP4" };
  const config = {
    images: Object.fromEntries(
      ["ku", "dff", "aric", "madeInEmirates", "architecture"].map((key) => [
        key,
        { ...image },
      ]),
    ),
    simulation: { video },
    experiments: [
      {
        id: "first",
        title: "First",
        description: "Original wording.",
        video: { ...video },
      },
    ],
  };
  const save = () =>
    writeFile(path.join(root, "upload.yaml"), stringify(config));
  await save();
  return { root, config, save };
}

test("new YAML entries produce deployable media and retain exact wording", async (t) => {
  const { root, config, save } = await fixture(t);
  await writeFile(path.join(root, "assets/new clip.mp4"), "new video bytes");
  config.experiments.push({
    id: "second",
    title: "Pick & Place — New",
    description: "Exact description.",
    video: { path: "assets/new clip.mp4" },
  });
  await save();
  const { manifest, count } = await prepareAssets(root);
  assert.equal(count, 3); // Reused files are copied once.
  assert.equal(manifest.experiments.length, 2);
  assert.equal(manifest.experiments[1].title, "Pick & Place — New");
  assert.deepEqual(manifest.experiments[1].video.types, ["video/mp4"]);
  const url = manifest.experiments[1].video.url;
  assert(!url.includes(" "));
  assert.equal(
    await readFile(path.join(root, "public", url), "utf8"),
    "new video bytes",
  );
});

test("replacing media changes its URL and removes stale generated copies", async (t) => {
  const { root } = await fixture(t);
  const first = await prepareAssets(root);
  await writeFile(
    path.join(root, "assets/clip with spaces.MP4"),
    "replacement bytes",
  );
  const second = await prepareAssets(root);
  assert.notEqual(
    first.manifest.simulation.video.url,
    second.manifest.simulation.video.url,
  );
  assert.equal(
    (await readdir(path.join(root, "public/assets/media"))).length,
    2,
  );
  await assert.rejects(
    readFile(path.join(root, "public", first.manifest.simulation.video.url)),
    { code: "ENOENT" },
  );
});

test("missing media fails with the YAML field and file path", async (t) => {
  const { root, config, save } = await fixture(t);
  config.experiments[0].video.path = "assets/missing.mp4";
  await save();
  await assert.rejects(
    prepareAssets(root),
    /experiments\[0\].video: file not found: assets\/missing.mp4/,
  );
});

test("unresolved LFS pointers fail before publishing", async (t) => {
  const { root } = await fixture(t);
  await writeFile(
    path.join(root, "assets/clip with spaces.MP4"),
    "version https://git-lfs.github.com/spec/v1\noid sha256:abc\nsize 100\n",
  );
  await assert.rejects(prepareAssets(root), /Git LFS pointer.*git lfs pull/);
});

test("duplicate experiment IDs and malformed YAML fail", async (t) => {
  const { root, config, save } = await fixture(t);
  config.experiments.push({ ...config.experiments[0] });
  await save();
  await assert.rejects(prepareAssets(root), /duplicate id first/);
  await writeFile(path.join(root, "upload.yaml"), "images: [");
  await assert.rejects(prepareAssets(root));
});

test("external paths and symlinks outside assets cannot be published", async (t) => {
  const { root, config, save } = await fixture(t);
  await writeFile(path.join(root, "private.mp4"), "not a site asset");
  config.simulation.video.path = "assets/../private.mp4";
  await save();
  await assert.rejects(prepareAssets(root), /must stay inside assets/);
  await symlink(
    path.join(root, "private.mp4"),
    path.join(root, "assets/link.mp4"),
  );
  config.simulation.video.path = "assets/link.mp4";
  await save();
  await assert.rejects(prepareAssets(root), /must stay inside assets/);
});
