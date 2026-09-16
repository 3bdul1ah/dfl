import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import {
  copyFile,
  mkdir,
  readFile,
  realpath,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const imageTypes = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".gif",
  ".avif",
]);
const videoTypes = {
  ".mp4": "video/mp4",
  ".m4v": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
  ".ogv": "video/ogg",
};

function requireText(value, label) {
  if (typeof value !== "string" || !value.trim())
    throw new Error(`${label} must be non-empty text.`);
}

function requireObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label} must be a YAML mapping.`);
}

export async function prepareAssets(root = projectRoot) {
  const config = parse(await readFile(path.join(root, "upload.yaml"), "utf8"));
  requireObject(config, "upload.yaml");
  requireObject(config.images, "images");
  requireObject(config.simulation, "simulation");
  if (!Array.isArray(config.experiments))
    throw new Error("experiments must be a YAML list.");
  for (const key of ["ku", "dff", "aric", "madeInEmirates", "architecture"]) {
    requireObject(config.images[key], `images.${key}`);
  }

  const assetsRoot = await realpath(path.join(root, "assets"));
  const files = new Map();
  let bytes = 0;

  async function resolveAsset(asset, kind, label) {
    requireObject(asset, label);
    requireText(asset.path, `${label}.path`);
    if (!asset.path.startsWith("assets/") || asset.path.includes("\\")) {
      throw new Error(
        `${label}.path must be a repository-relative assets/ path.`,
      );
    }
    let source;
    try {
      source = await realpath(path.resolve(root, asset.path));
    } catch {
      throw new Error(`${label}: file not found: ${asset.path}`);
    }
    if (!source.startsWith(assetsRoot + path.sep))
      throw new Error(`${label}: path must stay inside assets/.`);
    const info = await stat(source);
    if (!info.isFile() || info.size === 0)
      throw new Error(`${label}: expected a non-empty file.`);
    const ext = path.extname(source).toLowerCase();
    if (kind === "image") {
      if (!imageTypes.has(ext))
        throw new Error(`${label}: unsupported image extension ${ext}`);
      requireText(asset.alt, `${label}.alt`);
    } else {
      if (!videoTypes[ext])
        throw new Error(`${label}: unsupported video extension ${ext}`);
      asset.types ??= [videoTypes[ext]];
      if (
        !Array.isArray(asset.types) ||
        !asset.types.length ||
        asset.types.some((type) => !Object.values(videoTypes).includes(type))
      ) {
        throw new Error(
          `${label}.types must contain supported video MIME types.`,
        );
      }
    }
    if (!files.has(source)) {
      const hash = createHash("sha256");
      let first = true;
      for await (const chunk of createReadStream(source)) {
        if (
          first &&
          chunk
            .subarray(0, 200)
            .toString()
            .startsWith("version https://git-lfs.github.com/spec/v1")
        ) {
          throw new Error(
            `${asset.path} is a Git LFS pointer. Run git lfs pull before building.`,
          );
        }
        first = false;
        hash.update(chunk);
      }
      const name = path
        .basename(source, path.extname(source))
        .replace(/[^a-zA-Z0-9_-]+/g, "-");
      const url = `assets/media/${name}-${hash.digest("hex").slice(0, 12)}${ext}`;
      files.set(source, { url, size: info.size });
      bytes += info.size;
    }
    return { ...asset, url: files.get(source).url };
  }

  const images = {};
  for (const [key, asset] of Object.entries(config.images))
    images[key] = await resolveAsset(asset, "image", `images.${key}`);
  const simulation = {
    video: await resolveAsset(
      config.simulation.video,
      "video",
      "simulation.video",
    ),
  };
  const experiments = [];
  const ids = new Set();
  for (const [index, experiment] of config.experiments.entries()) {
    const label = `experiments[${index}]`;
    requireObject(experiment, label);
    for (const key of ["id", "title", "description"])
      requireText(experiment[key], `${label}.${key}`);
    if (ids.has(experiment.id))
      throw new Error(`${label}: duplicate id ${experiment.id}`);
    ids.add(experiment.id);
    experiments.push({
      ...experiment,
      video: await resolveAsset(experiment.video, "video", `${label}.video`),
    });
  }
  if (bytes > 950_000_000)
    throw new Error(
      "Media exceeds 950 MB; leave room for the app within the 1 GB Pages limit.",
    );

  // Validate everything first, then replace only build-generated files.
  const publicDir = path.join(root, "public");
  await rm(path.join(publicDir, "assets"), { recursive: true, force: true });
  await mkdir(path.join(publicDir, "assets/media"), { recursive: true });
  for (const [source, asset] of files)
    await copyFile(source, path.join(publicDir, asset.url));
  const manifest = { images, simulation, experiments };
  await mkdir(path.join(root, "src/generated"), { recursive: true });
  await writeFile(
    path.join(root, "src/generated/uploads.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  return { manifest, count: files.size, bytes };
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const { count, bytes } = await prepareAssets();
    console.log(
      `Prepared ${count} media files (${(bytes / 1_000_000).toFixed(1)} MB) from upload.yaml.`,
    );
  } catch (error) {
    console.error(`Asset build failed: ${error.message}`);
    process.exitCode = 1;
  }
}
