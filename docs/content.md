# Content guide

All content is parsed and validated at development startup and before a build.
The schema definitions are in `src/lib/content/schemas.mjs`. Unknown fields,
wrong types, duplicate IDs, malformed YAML and unsafe URLs produce errors that
identify the file and field. YAML mapping keys must also be unique.

## Shared conventions

- Section files have a `title`, optional `label`, and optional `enabled: false`.
  Disabled sections and links to them disappear. Keep the file, so it is easy
  to re-enable without application changes.
- Paragraphs, brand text and hero title lines support `**bold emphasis**.
  Other content is plain text. Raw HTML is never interpreted.
- Links are lists of `{label, href}`. Supported destinations are absolute
  `https://`/`http://` URLs, `mailto:` addresses or an existing `#section`.
  External links use `noopener noreferrer`. Omit the entire `links` field when
  no links are available; don't add empty buttons or blank URLs.
- IDs use lowercase letters, numbers and hyphens and must be unique within their
  collection. Team keys use the same convention.
- Image objects contain `path` and optional `alt`. Asset paths are relative to
  the repository root, start with `assets/`, and must stay inside that directory.
  Missing configured files fail a build; omitted optional images render normally.
- Supported images: PNG, JPEG, WebP, SVG, GIF and AVIF. Supported videos: MP4,
  M4V, MOV, WebM and OGV. This is file support, not a guarantee that every codec
  plays in every browser. Test your recordings in the browsers you support.
- Only content files should contain personal details. Component code should
  express layout and behavior, not a particular person's affiliations.

## Experiments and projects

Both collections accept the same entry fields. The following is an editing
example using an existing recording; it is not added to the published site:

```yaml
title: Hardware Demonstrations
label: Real-World Experiments
experiments:
  - id: mapping
    title: Mapping Experiment
    description: Describe what this recording demonstrates.
    video:
      path: assets/videos/Mapping_Experiment.MP4
    tags:
      - Mapping
    links:
      - label: Repository
        href: https://github.com/your-organization/your-repository
```

Required entry fields: `id`, `title`.

Optional entry fields:

| Field         | Value                                           |
| ------------- | ----------------------------------------------- |
| `description` | Plain text; no hard length limit or truncation  |
| `status`      | `planned`, `active`, `completed`, or `archived` |
| `tags`        | Any number of text entries                      |
| `links`       | A list of labeled links                         |
| `image`       | `{path, alt}` preview image                     |
| `video`       | Video object described below                    |

With neither media field, the card has an intentional text-only layout. When
both exist, the video takes precedence; use `video.poster` for a video preview
image instead. Add `#projects` to `site.navigation` if you want a navigation
link to populated projects. Cards appear automatically whether or not they
have a navigation link. No collection is limited to a fixed number of entries.

## Videos

```yaml
video:
  path: assets/videos/Navigation_Experiment.MOV
  types:
    - video/quicktime
    - video/mp4
  aspectRatio: 16 / 9
  # poster:
  #   path: assets/images/preview.jpg
  #   alt: Describe the preview.
```

Only `path` is required. MIME types are inferred unless overridden by `types`.
The default aspect ratio is `16 / 9`; use positive dimensions such as `3 / 4`
for a portrait simulation. Collection previews keep a consistent 16:9 frame
and contain videos without stretching. Simulation players honor their own
aspect ratio. Native playback controls are preserved; there is no autoplay.

## Team groups and members

The `teams` mapping may contain any number of groups. For example, this empty
editing scaffold does not publish a fictional team or an empty container:

```yaml
title: Research Team
teams:
  aric:
    name: Khalifa University — ARIC
    members: []
  dfl:
    name: Dubai Future Foundation
    members: []
  partner-lab:
    name: Partner lab
    members: []
```

Append members under their group's `members` list. A minimal member entry is
`- name: ...`, using the person's actual name. Available fields are:

| Field      | Purpose                                                           |
| ---------- | ----------------------------------------------------------------- |
| `name`     | Required display name                                             |
| `id`       | Stable identity; otherwise derived from the name                  |
| `initials` | Optional avatar initials; otherwise derived from the name         |
| `role`     | Role and/or affiliation                                           |
| `badge`    | Existing short designation, such as PI                            |
| `bio`      | Optional biography                                                |
| `image`    | Portrait `{path, alt}`; displayed square with `object-fit: cover` |
| `links`    | Any labeled profile, website or contact links                     |

Use explicit IDs for members whose names change or who share a name. No bio,
role, portrait or social link is required. A group can also have `description`.
ARIC and DFL remain separate entries and can be reordered without JSX changes.

## Identity, navigation and metadata

`site.yaml` includes:

- `name`, `brand`, `description`, `language`: global site identity.
- `url`, `repository`: optional deployment identity. GitHub Actions derives these
  from the current repository when null. `SITE_URL` takes priority over `url`.
- `base`: optional path override for nonstandard deployments; `SITE_BASE` takes
  priority. Prefer letting the build derive this from the public URL.
- `seo`: optional title/description overrides and a local image. Title and
  description fall back to the global identity. Canonical and absolute social
  image URLs are generated only when a public site URL is known.
- `favicon`: optional local image object.
- `navigation`: list of labeled section or external links. Known empty or
  disabled sections are automatically filtered out; misspelled section IDs fail.
- `hero`: tagline, title lines, description, logos, actions and optional badge.
  Logos have unique IDs and optional `framed: true` for a light background.
- `socials`: labeled links shown in the footer; an empty list renders nothing.
- `footer`: copyright year, partner links, and optional `sourceLabel` for the
  automatically detected repository link.
- `accessibility`: skip-link, menu and navigation labels for localization.

Contact links and email addresses belong in `contact.yaml`. To update social
links, add or remove entries in `site.socials`; no icon registry is required.

## Other sections

- `about.yaml`: paragraphs and feature entries with `id`, `title`, `description`.
- `platform.yaml`: paragraphs, optional image/placeholder, attribution, and
  repeating `{label, value}` specifications. Remove the existing `TBD` entries
  when appropriate instead of inventing hardware specifications.
- `architecture.yaml`: optional image and ordered steps, each with `id`, `title`,
  `description`. Numbers are generated from list order.
- `simulation.yaml`: paragraphs, optional video and tags.
- `contact.yaml`: paragraphs and labeled links.

No publications or awards file is included because the original site contains
neither. Add a new semantic section only when there is real content for it.

## Troubleshooting

- **Git LFS pointer:** run `git lfs install` and `git lfs pull`. A pointer file is
  not a playable recording.
- **Unknown field:** check spelling against this guide. Content is not silently
  ignored when a field is misspelled.
- **Duplicate ID:** choose a stable, distinct ID; order is controlled by the list.
- **File not found:** check case, spaces and the `assets/` prefix. Commit the media
  along with the YAML, including the Git LFS upload during push.
- **Broken optional image:** omit the field if no image exists. A configured
  nonexistent asset is a build error, not a placeholder published to visitors.
- **Old content while developing:** check the Vite error overlay, fix the YAML
  and save it again. Content changes trigger a full reload, not a server restart
  unless the public base path changes.
- **Pages 404:** enable Pages with GitHub Actions and check the deployment run.
  The workflow publishes only from the current repository's default branch.
