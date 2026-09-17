#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  printf 'Usage: ./build_website.sh\n\nSet up dfl-ku and start its local website preview.\nRequires Git, Git LFS, Node.js 22.12 or newer, and npm.\n'
  exit 0
fi

if (( $# > 0 )); then
  printf 'Run ./build_website.sh without arguments, or use --help.\n' >&2
  exit 1
fi

fail() {
  printf '\nSetup stopped: %s\n' "$1" >&2
  exit 1
}

trap 'printf "\nSetup stopped. Check the error above, fix the problem, and run ./build_website.sh again.\n" >&2' ERR

repo_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd -- "$repo_dir"

command -v git >/dev/null 2>&1 || fail 'Install Git, then try again.'
command -v node >/dev/null 2>&1 || fail 'Install Node.js 22.12 or newer (including npm), then try again.'
command -v npm >/dev/null 2>&1 || fail 'Install npm with Node.js, then try again.'
git lfs version >/dev/null 2>&1 || fail 'Install Git LFS, then try again.'

if ! node -e 'const [major, minor] = process.versions.node.split(".").map(Number); process.exit(major > 22 || (major === 22 && minor >= 12) ? 0 : 1)'; then
  fail "Node.js $(node --version) is too old. Install Node.js 22.12 or newer."
fi

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail 'Download this project with git clone, then run the script inside that copy.'

printf '\n1/3 Downloading website photos and videos...\n'
git lfs install --local
git lfs pull

printf '\n2/3 Installing website dependencies...\n'
cd -- "$repo_dir/website"
npm ci

printf '\n3/3 Starting your local website preview...\n'
printf 'Open the Local address printed below. Save content files to see updates.\n'
printf 'Press Ctrl+C to stop. Your terminal will remain in its original folder.\n\n'
exec npm run dev
