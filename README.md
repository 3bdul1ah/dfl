# AI Powered Airport Automation

This fork publishes an independent copy of the project website:

https://3bdul1ah.github.io/dfl/

## Website deployment

GitHub Pages publishes the root of the `main` branch in `3bdul1ah/dfl`.
The site is plain HTML with CSS embedded in `index.html`; no package installation
or build command is needed. `.nojekyll` disables Jekyll processing.

Push website changes to this fork's `main` branch to deploy them. Changes pushed
only to `new/feat` do not deploy until they are merged into `main`. Check the
repository's Actions tab for the Pages deployment result.

## Assets

- All displayed images, including the KU and DFF logos, are in `assets/images/`.
- The five embedded videos are attachments on this fork's `v1.0` release:
  https://github.com/3bdul1ah/dfl/releases/tag/v1.0
- Video URLs in `index.html` point to this fork, not the upstream repository.
- Files in `assets/videos/` use Git LFS. They are working copies, not the URLs
  used by the website's video players.

Release attachment filenames must match the HTML URLs exactly. In particular,
upload `assets/videos/isaac sim simulation.mp4` with the attachment name
`isaac.sim.simulation.mp4`.

To update a video, upload it to a new release and update its URL in `index.html`,
then publish the HTML change to `main`. Merely committing a video under
`assets/videos/` does not update the release attachment. Publishing a release
and deploying the website are separate operations.

## Local preview

Run `python3 -m http.server 8000` from the repository root and open
http://localhost:8000. Video playback requires access to GitHub release downloads.

## Upstream

Original project: https://github.com/AdvancedResearchInnovationCenter/dfl

This fork's releases and Pages deployment are managed independently. Changes
here do not update the upstream site. When syncing upstream changes, retain
this fork's release URLs and local image paths.
