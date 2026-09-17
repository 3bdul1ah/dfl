# Repository Guidelines

## Project Structure & Module Organization

This React/Vite website uses root YAML files for editable content: `site.yaml`,
`team.yaml`, `experiments.yaml`, and related section files. Keep presentation in
`website/src/components/` and `website/src/styles.css`; content loading and
validation belong in `website/src/lib/content/`. Build scripts live in
`website/scripts/`, tests in `website/tests/`, and media in `assets/images/` and
`assets/videos/`. Deployment lives in `.github/workflows/deploy.yaml`.

## Build, Test, and Development Commands

Use Node.js 22.12 or newer, npm, and Git LFS. Run `git lfs install` and
`git lfs pull` from the repository root. Run these commands from `website/`:

- `npm ci`: install locked dependencies.
- `npm run dev`: start the local Vite development server.
- `npm run build`: build and prerender the production website.
- `npm run preview`: serve the production build locally.
- `npm run content:check`: validate YAML content and referenced assets.
- `npm test`: run the test suite.
- `npm run format`: apply Prettier formatting.
- `npm run check`: run ESLint, formatting checks, content validation, tests, and build.

## Coding Style & Naming Conventions

Use JavaScript/JSX and ES modules, two-space indentation, LF endings, and final
newlines. Follow ESLint and Prettier. Name React component files in PascalCase,
such as `Team.jsx`; use unique kebab-case content IDs, such as `new-capability`.
Use case-sensitive, repository-relative asset paths and descriptive image alt
text. Preserve factual wording; avoid em dashes and en dashes in website copy.
Prefer CSS and native elements over additional runtime dependencies.

## Testing Guidelines

Tests use Node's built-in `node:test` and strict assertions, with React server
rendering through Vite. Name tests `*.test.mjs`. No numeric coverage threshold is
configured. Content-system changes need schema and rendering tests covering
minimal items, omitted optional fields, long text, multiple items, and empty
collections. Document new YAML fields in `website/docs/content.md`.

For visual changes, check mobile, tablet, laptop, and wide layouts, keyboard
focus, menu Escape behavior, overflow, and reduced motion.

## Commit & Pull Request Guidelines

Use concise imperative commit subjects, matching history: `Add team portraits`
or `Keep editing guide at repository root`. Keep changes focused. Before opening
a PR, run formatting and the full check. Describe behavior changes and relevant
verification; include screenshots for visual changes.

## Configuration & Deployment

Leave `site.yaml` URL and repository settings null for automatic detection.
Successful default-branch workflow runs deploy GitHub Pages. Never commit
credentials or generated `website/dist/`, `website/public/assets/`, or
`website/src/generated/` output. Videos use Git LFS.
