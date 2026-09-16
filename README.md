# Research project website

React, Vite and YAML. Edit content files, save, and the website updates.

## Find what to edit

| Change                                                        | File                                  |
| ------------------------------------------------------------- | ------------------------------------- |
| Site name, hero, logos, navigation, SEO, social links, footer | `content/site.yaml`                   |
| Browser tab icon                                              | `favicon.path` in `content/site.yaml` |
| About text and feature cards                                  | `content/about.yaml`                  |
| Robot platform and specifications                             | `content/platform.yaml`               |
| Architecture diagram and steps                                | `content/architecture.yaml`           |
| Simulation text and video                                     | `content/simulation.yaml`             |
| Experiment cards                                              | `content/experiments.yaml`            |
| ARIC, DFL and other teams                                     | `content/team.yaml`                   |
| Project cards                                                 | `content/projects.yaml`               |
| Contact details                                               | `content/contact.yaml`                |
| Colors, spacing and responsive layout                         | `src/styles.css`                      |
| Section layouts and reusable cards                            | `src/components/`                     |

## Run locally

Install Node.js **22.12 or newer**, npm and Git LFS. Clone your fork, open its
folder, then run:

```sh
git lfs install
git lfs pull
npm ci
npm run dev
```

Open the URL printed in the terminal. Save YAML or asset changes to reload the
page automatically. If validation fails, fix the file and field shown in the error.

## Add an experiment or project

Append an item under `experiments` in `content/experiments.yaml`:

```yaml
- id: mapping
  title: Mapping Experiment
  video:
    path: assets/videos/Mapping_Experiment.MP4
```

Use a unique `id` and the actual title and media path. Only `id` and `title`
are required. Save: a new card appears and the grid adjusts. Projects work the
same way under `projects` in `content/projects.yaml`.

For descriptions, images, tags, status and links, see the
[available fields](docs/content.md#experiments-and-projects).

## Add a team member or group

Open `content/team.yaml`:

1. Find the group under `teams`, such as `aric` or `dfl`.
2. Add an entry under its `members` list with the person's `name`.
3. Add `id`, `role`, `bio`, `image` or `links` if needed.
4. Save. The member appears automatically.

To add a group, add a unique key under `teams` with a `name` and a `members`
list. Fill that list the same way. Empty groups stay hidden. See the
[team examples and fields](docs/content.md#team-groups-and-members).

## Replace an image, video or icon

1. Put the file in `assets/images/` or `assets/videos/`.
2. Set its `path` in the relevant YAML file, including the `assets/` prefix.
3. Add descriptive `alt` text for images.
4. Save and commit both the asset and YAML.

Paths are case-sensitive. The browser tab icon uses `assets/images/robot.svg`.
Only referenced assets are included in the build. Videos use Git LFS.
No `upload.yaml` or GitHub Release is needed.

## Customize and deploy a fork

1. Edit `content/site.yaml` for your identity, social links and metadata.
2. Edit the other content files for your project and team.
3. Leave `url` and `repository` null to detect your GitHub Pages address automatically.
4. In your fork, open **Settings → Pages → Source → GitHub Actions**.
5. Enable Actions, then push to your default branch.

The workflow checks, builds and deploys your fork. Content and assets publish
with each successful build. Check the **Actions** tab for progress or errors.

For another static host, set `url` in `content/site.yaml`, run `npm run build`,
and upload `dist/`. Include any subdirectory in that URL.

## Check changes

```sh
npm run format    # Format files
npm run check     # Lint, formatting, content validation, tests and build
npm run preview   # Preview the production build
```

Do not edit generated files in `dist/`, `public/assets/` or `src/generated/`.
Content validation lives in `src/lib/content/`; build scripts live in `scripts/`.

[All content fields and troubleshooting](docs/content.md) ·
[Contributing](CONTRIBUTING.md)

Original project: [Advanced Research and Innovation Center](https://github.com/AdvancedResearchInnovationCenter/dfl).
No license was present in the original repository; this refactor does not grant
new rights to its source, branding or media.
