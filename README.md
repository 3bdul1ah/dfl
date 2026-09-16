# Research project website

A content-driven research website built with React, Vite and plain CSS. It
prerenders to static HTML and publishes its images and videos with the site.
Content, identity and collections live in YAML; adding a card or a team does
not require editing React.

The included content documents the AI Powered Airport Automation collaboration.
It is real project content, not a collection of fictional template examples.
Replace it with your own information when customizing a fork.

## Quick start

Prerequisites: Node.js **22.12 or newer**, npm, and Git LFS for the included videos.

```sh
git clone <your-repository-url>
cd <your-repository-directory>
git lfs install
git lfs pull
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://127.0.0.1:5173/`. YAML and media
changes reload the development page automatically. Invalid content produces an
error with the file/field to fix; it is never silently published. Fix the file
and save again to recover. Component and CSS edits also update automatically.

## Content files

| File                        | Controls                                                             |
| --------------------------- | -------------------------------------------------------------------- |
| `content/site.yaml`         | Identity, hero, logos, navigation, metadata, social links and footer |
| `content/about.yaml`        | About paragraphs and repeating feature cards                         |
| `content/platform.yaml`     | Platform description, image and specifications                       |
| `content/architecture.yaml` | Architecture image and ordered steps                                 |
| `content/simulation.yaml`   | Simulation description, video and tags                               |
| `content/experiments.yaml`  | Experiment cards                                                     |
| `content/team.yaml`         | Independent ARIC, DFL and any additional team groups                 |
| `content/projects.yaml`     | Optional project cards; initially empty                              |
| `content/contact.yaml`      | Contact text and links                                               |

`upload.yaml` has been replaced by these section files. Put each asset path
beside the content that uses it. There is no duplicate upload manifest to maintain.
See [the content guide](docs/content.md) for schemas, examples and validation rules.

### Add an experiment

1. Put the recording or image under `assets/`, if the entry needs media.
2. Open `content/experiments.yaml`.
3. Append an entry to `experiments` with a unique `id` and a `title`.
4. Save. The new card appears and the grid adjusts automatically.

Descriptions, images, videos, status, tags and links are optional. You can add
one item or many; the component does not need to change. Projects work the same
way in `content/projects.yaml`. An empty collection hides its section and any
navigation link pointing to it.

### Edit teams

Open `content/team.yaml` and add a member under the appropriate group's `members`
list. Only `name` is required; supply an explicit `id` if the name could change
or two members have the same name. Roles, biographies, portraits and links are
optional.

To add another group, add another key under `teams` with a `name` and `members`.
Groups render in file order. Empty groups do not create empty containers.
ARIC and DFL are data entries, not hardcoded component branches.

### Customize identity and assets

Edit `site.yaml` for the brand, hero title, description, logos, SEO, navigation,
footer and social links; edit `contact.yaml` for contact details. Historical
project affiliations and team member information live only in content files.

Use paths such as `assets/images/architecture.jpg` or
`assets/videos/Mapping_Experiment.MP4`. Paths are case-sensitive and may contain
spaces. Add meaningful `alt` text to images; team and experiment images can use
the person's name or card title as a fallback. The build reads intrinsic image
dimensions to reserve space. Omit an optional image entirely for an image-less
card, or remove a portrait to use initials.

Only referenced assets are deployed. They receive content-hashed URLs so
replacements are not hidden behind stale browser caches. Video files are copied
without transcoding. Keep them browser-compatible. Existing Git LFS rules cover
MP4/MOV; add rules for additional large video formats if you start using them.
GitHub Releases are not involved in publishing.

## Checks and production preview

```sh
npm run lint
npm run format:check
npm run content:check
npm test
npm run build
npm run preview
```

`npm run check` runs all checks and the production build. `npm run format` applies
Prettier. This is a JavaScript project: YAML has runtime schemas and tests rather
than a TypeScript typecheck script. ESLint checks JavaScript and JSX.

The production build prerenders the page, preserving content, section links,
mobile navigation and native video controls without JavaScript. React hydrates
it to enhance menu focus behavior. Generated files under `dist/`,
`public/assets/` and `src/generated/` are ignored by Git.

## Deploy your own fork

1. Fork this repository and customize `content/`.
2. In **your repository** choose **Settings → Pages → Source → GitHub Actions**.
3. Enable Actions in your fork if GitHub has disabled them.
4. Push to your repository's default branch, or run **Check and deploy website**
   from the Actions tab on that branch.

The workflow tests and builds branches and pull requests, but publishes only
from the repository's default branch. It uses the current repository's Pages
URL; there is no original-owner allowlist, hardcoded `/dfl/` base, or upstream
push. Your repository's normal branch/environment protection rules still apply.
A custom domain configured in Pages is picked up by the same workflow.

Leave `site.url` and `site.repository` null for automatic GitHub detection.
For other static hosts, set `url` to your complete public site URL (including
any subdirectory), then upload `dist/`. You can also set `SITE_URL` and
`SITE_BASE` when building. The base must start and end with `/`.

```sh
SITE_URL=https://research.example.org/work/ npm run build
npm run preview
```

Visit `/work/` on the preview server in this example. Local development defaults
to `/` when no deployment URL is configured. Changing the base in YAML restarts
Vite automatically; use its updated URL. Changing a custom domain in YAML does
not configure DNS or GitHub settings for you.

GitHub Pages has a 1 GB published-site limit and a 100 GB/month soft bandwidth
limit. The pipeline limits referenced media to 950 MB and checks the complete
build. Large or heavily watched video libraries may eventually need a media
host. The site does not transcode video or generate responsive image variants.

## Project structure

```text
content/                  Editable YAML content
assets/                   Original images and Git LFS recordings
src/components/           Page sections, collection cards and shared presentation
src/lib/content/          YAML schemas, asset processing and deployment metadata
src/lib/sections.js        Visibility rules shared by page and navigation
scripts/content-plugin.mjs Vite integration and live YAML reload
scripts/prerender.mjs      Static HTML generation
src/styles.css            Shared tokens, responsive layout and interactions
tests/                    Content, asset and rendering acceptance tests
.github/workflows/        Repository-aware checks and Pages deployment
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and
[the content guide](docs/content.md) for all supported fields.

Original project attribution:
[Advanced Research and Innovation Center](https://github.com/AdvancedResearchInnovationCenter/dfl).
No license was present in the original repository; this refactor does not grant
new rights to its source, branding or media. Confirm reuse rights before
redistributing them.
