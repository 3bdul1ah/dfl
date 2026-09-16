import test from "node:test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { schemas } from "../src/lib/content/schemas.mjs";
import { readContent } from "../src/lib/content/load.mjs";
import { deployment } from "../src/lib/content/deployment.mjs";
import { metadata } from "../src/lib/content/metadata.mjs";
import { contentFixture } from "./fixtures.mjs";

const entry = { id: "example", title: "A research demonstration" };
test("experiments accept omitted optional fields and reject malformed entries", () => {
  const parse = (experiments) =>
    schemas.experiments(
      { title: "Experiments", experiments },
      "experiments.yaml",
    );
  assert.deepEqual(parse([entry]).experiments[0].links, []);
  assert.throws(() => parse([entry, entry]), /duplicate id/);
  assert.throws(
    () => parse([{ ...entry, status: "unrecognized" }]),
    /expected one of/,
  );
  assert.throws(
    () => parse([{ ...entry, tags: "not a list" }]),
    /expected a YAML list/,
  );
  assert.throws(
    () =>
      parse([
        { ...entry, links: [{ label: "Unsafe", href: "javascript:alert(1)" }] },
      ]),
    /expected an http/,
  );
  assert.throws(
    () => parse([{ ...entry, links: [{ label: "Missing URL" }] }]),
    /href/,
  );
  assert.throws(() => parse([{ ...entry, titel: "Typo" }]), /unknown field/);
});
test("team groups accept name-only members and have unique stable identities", () => {
  const parsed = schemas.team(
    {
      title: "Team",
      teams: {
        "new-lab": {
          name: "New Lab",
          members: [{ name: "Research Collaborator" }],
        },
        empty: { name: "Empty" },
      },
    },
    "team.yaml",
  );
  assert.equal(parsed.teams["new-lab"].members[0].id, "research-collaborator");
  assert.deepEqual(parsed.teams.empty.members, []);
  assert.throws(
    () =>
      schemas.team(
        {
          title: "Team",
          teams: {
            lab: {
              name: "Lab",
              members: [
                { id: "one", name: "A" },
                { id: "one", name: "B" },
              ],
            },
          },
        },
        "team",
      ),
    /duplicate id/,
  );
});
test("malformed YAML and duplicate YAML mapping keys report the file", async (t) => {
  const { root } = await contentFixture(t);
  await writeFile(path.join(root, "about.yaml"), "title: [");
  await assert.rejects(readContent(root), /about.yaml/);
  await writeFile(path.join(root, "about.yaml"), "title: One\ntitle: Two\n");
  await assert.rejects(readContent(root), /Map keys must be unique/);
});
test("unknown section links are caught before deployment", async (t) => {
  const { root, content, save } = await contentFixture(t);
  content.site.navigation.push({ label: "Broken", href: "#unknown" });
  await save();
  await assert.rejects(readContent(root), /unknown section #unknown/);
});
test("demonstration categories require a known category and media evidence", async (t) => {
  const { root, content, save } = await contentFixture(t);
  const item = content.experiments.experiments[0];
  item.category = "missing-category";
  await save();
  await assert.rejects(readContent(root), /category: unknown category/);
  item.category = "navigation";
  delete item.video;
  delete item.image;
  await save();
  await assert.rejects(
    readContent(root),
    /require an image or video as evidence/,
  );
});
test("fresh forks, user sites, custom domains and local development resolve without owner constants", () => {
  assert.equal(deployment({}, {}).base, "/");
  assert.deepEqual(
    deployment({}, { GITHUB_REPOSITORY: "research-lab/research" }),
    {
      base: "/research/",
      url: "https://research-lab.github.io/research/",
      repository: "https://github.com/research-lab/research",
    },
  );
  assert.equal(
    deployment({}, { GITHUB_REPOSITORY: "research-lab/research-lab.github.io" })
      .base,
    "/",
  );
  assert.equal(
    deployment({}, { SITE_URL: "https://research.example.org" }).base,
    "/",
  );
  assert.equal(deployment({ base: "/preview/" }, {}).base, "/preview/");
  assert.throws(() => deployment({ base: "//evil/" }, {}), /slash-delimited/);
});
test("metadata is configurable, escaped and omits absent optional values", () => {
  const site = {
    name: "Research & Robotics",
    description: 'A "quoted" description',
    seo: {},
    base: "/",
  };
  const html = metadata(site);
  assert(html.includes("Research &amp; Robotics"));
  assert(html.includes("&quot;quoted&quot;"));
  assert(!html.includes("canonical"));
  assert(!html.includes("undefined"));
  const full = metadata({
    ...site,
    url: "https://research.example.org/work/",
    seo: { image: { url: "assets/diagram.png", alt: "Diagram" } },
  });
  assert(full.includes("https://research.example.org/work/assets/diagram.png"));
  assert(full.includes('rel="canonical"'));
});
