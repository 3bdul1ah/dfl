import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseDocument } from "yaml";
import { schemas } from "./schemas.mjs";
import { deployment } from "./deployment.mjs";
import { resolveAssets } from "./assets.mjs";

export const projectRoot = fileURLToPath(new URL("../../../", import.meta.url));
export async function readContent(root = projectRoot) {
  const content = {};
  for (const [name, validate] of Object.entries(schemas)) {
    const file = `content/${name}.yaml`;
    let source;
    try {
      source = await readFile(path.join(root, file), "utf8");
    } catch {
      throw new Error(`${file}: file is missing`);
    }
    const doc = parseDocument(source, { uniqueKeys: true });
    if (doc.errors.length) throw new Error(`${file}: ${doc.errors[0].message}`);
    content[name] = validate(doc.toJS({ maxAliasCount: 50 }), file);
  }
  if (!content.site.hero.title.length)
    throw new Error(
      "content/site.yaml.hero.title: supply at least one title line",
    );
  const sectionIds = new Set([
    "hero",
    ...Object.keys(content).filter((key) => key !== "site"),
  ]);
  function validateLinks(value, field) {
    if (Array.isArray(value))
      return value.forEach((entry, index) =>
        validateLinks(entry, `${field}[${index}]`),
      );
    if (!value || typeof value !== "object") return;
    if (value.href?.startsWith("#") && !sectionIds.has(value.href.slice(1)))
      throw new Error(`${field}.href: unknown section ${value.href}`);
    for (const [key, entry] of Object.entries(value))
      validateLinks(entry, `${field}.${key}`);
  }
  validateLinks(content, "content");
  return content;
}
export async function compileContent({
  root = projectRoot,
  env = process.env,
  write = true,
} = {}) {
  const content = await readContent(root);
  const resolvedDeployment = deployment(content.site, env);
  content.site = { ...content.site, ...resolvedDeployment };
  const result = await resolveAssets(content, root, { write });
  if (write) {
    await mkdir(path.join(root, "src/generated"), { recursive: true });
    await writeFile(
      path.join(root, "src/generated/content.json"),
      JSON.stringify(result.content, null, 2) + "\n",
    );
  }
  return result;
}
