import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { compileContent } from "../src/lib/content/load.mjs";
import { schemas } from "../src/lib/content/schemas.mjs";

// Render through the real application: these tests verify wiring, not isolated mock cards.
test("configuration collections render through App, including empty and long-content cases", async (t) => {
  const { content } = await compileContent({ env: {} });
  const server = await createServer({
    cacheDir: "node_modules/.vite-tests",
    server: { middlewareMode: true, hmr: false, ws: false, watch: null },
    appType: "custom",
  });
  try {
    const { default: App } = await server.ssrLoadModule("/src/App.jsx");
    const render = (data) =>
      renderToStaticMarkup(createElement(App, { content: data }));
    for (const count of [0, 1, 7]) {
      await t.test(`${count} experiments create exactly ${count} cards`, () => {
        const next = structuredClone(content);
        next.experiments = schemas.experiments(
          {
            title: "Experiments",
            experiments: Array.from({ length: count }, (_, index) => ({
              id: `experiment-${index}`,
              title: "A long research title ".repeat(12),
              description: "A longer description. ".repeat(30),
              tags: Array.from({ length: 15 }, (_, tag) => `Tag ${tag}`),
              ...(index === 0
                ? {
                    links: [
                      {
                        label: "Repository",
                        href: "https://example.org/research",
                      },
                    ],
                  }
                : {}),
            })),
          },
          "experiments",
        );
        const html = render(next);
        assert.equal(
          (html.match(/class="collection-card"/g) || []).length,
          count,
        );
        assert.equal(html.includes('id="experiments"'), count > 0);
        assert.equal(html.includes('href="#experiments"'), count > 0);
        assert.equal(html.includes(">Repository</a>"), count > 0);
        assert(!html.includes("undefined"));
      });
    }
    for (const count of [1, 10]) {
      await t.test(
        `${count} name-only members in an additional YAML group render automatically`,
        () => {
          const next = structuredClone(content);
          next.team = schemas.team(
            {
              ...next.team,
              teams: {
                ...next.team.teams,
                "new-lab": {
                  name: "New Lab",
                  members: Array.from({ length: count }, (_, index) => ({
                    name: `Research Collaborator ${index}`,
                    ...(index === 0
                      ? { role: "A very long research role ".repeat(20) }
                      : {}),
                  })),
                },
                empty: { name: "Empty group", members: [] },
              },
            },
            "team",
          );
          const html = render(next);
          assert(html.includes('id="team-new-lab"'));
          assert(!html.includes("Empty group"));
          assert.equal(
            (html.match(/aria-labelledby="member-new-lab-/g) || []).length,
            count,
          );
        },
      );
    }
    await t.test(
      "projects use the same collection renderer without application changes",
      () => {
        const next = structuredClone(content);
        next.projects = schemas.projects(
          {
            title: "Projects",
            projects: [{ id: "research", title: "Research project" }],
          },
          "projects",
        );
        assert(render(next).includes('id="projects-research"'));
      },
    );
    await t.test(
      "disabled sections do not leave broken navigation, and HTML remains meaningful before hydration",
      () => {
        const next = structuredClone(content);
        next.about.enabled = false;
        const html = render(next);
        assert(!html.includes('href="#about"'));
        assert(html.includes("<main"));
        assert(html.includes("<summary>Menu</summary>"));
        assert(html.includes('href="#main-content"'));
        assert(!html.includes("releases/download"));
      },
    );
  } finally {
    await server.close();
  }
});
