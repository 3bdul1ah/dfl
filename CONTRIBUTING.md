# Contributing

Keep content changes in `content/`, presentation in `src/components/` and
`src/styles.css`, and build-time parsing in `src/lib/content/`. Preserve the
project's factual wording unless a content correction is intentional.

1. Create a branch in your own repository.
2. Install with `npm ci`; fetch media with `git lfs pull`.
3. Develop with `npm run dev`.
4. Run `npm run format` and `npm run check` before opening a pull request.
5. Explain the behavior change and relevant verification in the pull request.

For content system changes, extend the rendering tests as well as schema tests.
Test at least a minimal item, omitted optional fields, long text, multiple items
and an empty collection. New YAML fields must be wired to a renderer or build
behavior and documented in `docs/content.md`.

For visual changes, check narrow (320–430px), tablet (768px), laptop (1024px),
and wide (1440–1920px) layouts. Resize between them. Check overflow, keyboard
focus, the mobile menu (including Escape), and reduced motion. Keep essential
content and native controls available before hydration.

The repository uses JavaScript/JSX, ESLint and Prettier. Avoid adding runtime
packages for effects achievable with CSS or native elements. There is no
TypeScript compilation step to suppress or bypass.

Never commit generated output, authentication files or build artifacts. Do not
change an upstream repository's Pages settings while testing a fork. The Pages
workflow uses its own repository and default branch automatically.
