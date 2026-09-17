# Update the dfl-ku website

[Open the live website](https://advancedresearchinnovationcenter.github.io/dfl-ku/)

## 1. Open the website on your computer

You need **Git**, **Git LFS**, and **Node.js 22.12 or newer** installed first.
Ask a teammate to help with this one-time setup if needed.

Open a terminal (Git Bash on Windows), then copy these commands:

```sh
git clone https://github.com/AdvancedResearchInnovationCenter/dfl-ku.git
cd dfl-ku
./build_website.sh
```

Open the **Local** link shown in the terminal, usually
`http://127.0.0.1:5173/`. This is your **localhost preview**: a copy of the website
on your computer where you can see your edits before publishing.

Keep the terminal open while you work.

## 2. Change or add content

Open the **`website_content`** folder in a text editor. Choose the file for the
part of the website you want to update:

| To update…                            | Open…               |
| ------------------------------------- | ------------------- |
| Website title, logos, menu, and links | `site.yaml`         |
| About the project                     | `about.yaml`        |
| Robot details                         | `platform.yaml`     |
| Loading, unloading, and relocation    | `use-cases.yaml`    |
| How the system works                  | `architecture.yaml` |
| Simulation text and video             | `simulation.yaml`   |
| Demonstrations and experiments        | `experiments.yaml`  |
| Team members and their details        | `team.yaml`         |
| Other projects                        | `projects.yaml`     |
| Contact information                   | `contact.yaml`      |

**To change text:** replace the existing words. Keep labels such as `title:`
and the spaces at the start of each line.

**To add an item:** copy a similar item in the same file and change its details.
Give its `id` a new name. For a team member, copy someone in the same team.
[See examples for adding content](website/docs/content.md).

**To add a photo or video:** put it in `assets/images/` or `assets/videos/`.
In the content file, change the existing `path:` to match your new file, for
example `assets/images/team-photo.jpg`.

> **Photos and videos are handled for you.** Include them when you save and push
> your changes below. Git stores the photos, and Git LFS handles MP4 and MOV
> videos behind the scenes. They publish with the website, so you do not need
> to create a GitHub Release, upload them separately, or deploy them yourself.

**Save the file, then look at your localhost preview.** The page updates
automatically. Check that the text and pictures look right. Your edits are
still only on your computer.

## 3. Publish your changes

When you are happy with the preview, press **Ctrl+C** in the terminal to stop it.
From the `dfl-ku` folder, run these checks:

```sh
npm --prefix website run format
npm --prefix website run check
```

If a check reports a problem, fix it before continuing. Then run:

```sh
git add .
git commit -m "Update website content"
git push origin main
```

This sends your saved changes to GitHub. You need permission to publish;
if GitHub refuses the push, ask a repository maintainer for help.

> **Publishing is automatic.** After a successful push to `main`, GitHub checks
> and updates the live website for you. Wait a few minutes, then refresh it.
> You do not need to upload or deploy anything separately.

## Next time

Once your previous work is published, open a terminal in the `dfl-ku` folder
and run:

```sh
git switch main
git pull --ff-only origin main
./build_website.sh
```

This gets the latest changes and opens your local preview again. If a command
reports an error, ask for help before continuing.

[More content examples](website/docs/content.md) ·
[Guide for developers](website/CONTRIBUTING.md)
