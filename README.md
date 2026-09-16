# AI Powered Airport Automation

Standalone React website for **3bdul1ah/dfl**:

https://3bdul1ah.github.io/dfl/

## Add or replace media

1. Put your image or video in `assets/images/` or `assets/videos/`.
2. Reference its repository-relative path in **`upload.yaml`**.
3. Commit the file and YAML change, then push to this fork's **`main`** branch.

The build validates the YAML, downloads Git LFS content in CI, copies the listed
media into the website, builds React, and deploys everything to GitHub Pages.
There is no release-upload step and no dependency on release download URLs.
The old `v1.0` release can remain as an archive; the website no longer uses it.

For example, append an experiment to the `experiments` list:

```yaml
- id: mapping
  title: Mapping Experiment
  description: Describe the demonstration here.
  video:
    path: assets/videos/Mapping_Experiment.MP4
```

This creates an additional card automatically, in YAML list order. Each `id`
must be unique. Keep existing entries to keep their cards. Text is rendered as
plain text, so YAML descriptions do not need HTML.

- `images` configures the existing named image slots (`ku`, `dff`, `aric`,
  `madeInEmirates`, `architecture`) with `path` and `alt` fields. Adding a new
  image slot to the layout also requires adding an `ImageAsset` component.
- `simulation.video` configures the simulation player.
- `experiments` configures the repeatable demonstration cards, including their
  `id`, `title`, `description`, and `video.path`.
- Video MIME types are inferred from extensions. An optional `video.types` list
  supports multiple source declarations, as used by the existing MOV video.
- Paths may contain spaces and are case-sensitive. Files must exist under
  `assets/`. Only media referenced in the YAML is copied to the deployed site.
- Files are copied byte-for-byte, without transcoding. Use browser-compatible
  media. Content hashes in generated filenames prevent stale cached replacements.
- Missing files, unresolved Git LFS pointers, malformed configuration, duplicate
  IDs, and excessive deployment size fail the build before deployment.

Videos are tracked by Git LFS through `.gitattributes`. Install Git LFS and run
`git lfs pull` after cloning to obtain their actual contents. Add and commit new
videos normally; Git LFS manages the upload during `git push`.

## Development

Use Node.js 22.12 or newer and npm:

```sh
npm ci
npm run dev
```

Open the printed URL (normally http://127.0.0.1:5173/dfl/). Restart `npm run dev`
after changing `upload.yaml` or media files so the asset manifest is regenerated.
React component and CSS edits update through Vite's development server.

```sh
npm test
npm run build
npm run preview
```

Preview the production build at http://127.0.0.1:4173/dfl/.

## Project layout

- `upload.yaml`: editable media paths and experiment content.
- `assets/`: original images and Git LFS videos.
- `src/components/`: React sections and shared media/card components.
- `src/styles.css`: the original website styles.
- `scripts/prepare-assets.mjs`: validates media and generates the asset manifest.
- `scripts/prerender.mjs`: renders the page to HTML at build time, preserving
  content, navigation and native video controls even without JavaScript.
- `.github/workflows/deploy.yaml`: tests, builds and deploys this fork only.
- `dist/`, `public/assets/`, `src/generated/`: generated files; do not edit or commit.

The existing wording, layout, responsive styles, section IDs, and video controls
are preserved. Additional page layouts can be implemented as React components.

## Deployment

GitHub Pages uses **GitHub Actions** as its publishing source. The workflow runs
on pushes to `main`; pull requests to `main` are tested and built without
publishing. Manual runs are also available from the Actions tab. A repository
check permits deployment only from `3bdul1ah/dfl`.

The workflow checks out actual Git LFS files (`lfs: true`), runs `npm ci`, tests,
and builds, then uploads `dist/` as the Pages artifact. Vite's `/dfl/` base path
makes all script, stylesheet, image and video URLs work under the project URL.
Pushes only to `new/feat` do not update the live site until merged into `main`.

GitHub Pages limits the published site to 1 GB and has a soft bandwidth limit
of 100 GB/month. The build reserves space for the app by limiting listed media
to 950 MB, and checks the final deployment size. A larger video library may
need a separate media host later.

Original project: https://github.com/AdvancedResearchInnovationCenter/dfl

This fork's deployment is independent. Do not change `origin` to the upstream
repository when publishing this site.
