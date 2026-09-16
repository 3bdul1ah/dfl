import { webUrl } from "./schema.mjs";

/** Resolve the current repository/site, never the upstream repository. */
export function deployment(site, env = process.env) {
  const repository =
    site.repository ??
    (env.GITHUB_REPOSITORY
      ? `https://github.com/${env.GITHUB_REPOSITORY}`
      : undefined);
  let url = env.SITE_URL || site.url;
  if (!url && env.GITHUB_REPOSITORY) {
    const [owner, repo] = env.GITHUB_REPOSITORY.split("/");
    url = `https://${owner}.github.io/${repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? "" : `${repo}/`}`;
  }
  if (url) {
    webUrl(url, "site.url");
    const parsed = new URL(url);
    if (parsed.search || parsed.hash)
      throw new Error("site.url: do not include query strings or fragments");
    url = `${parsed.origin}${parsed.pathname.replace(/\/$/, "")}/`;
  }
  const base =
    env.SITE_BASE || site.base || (url ? new URL(url).pathname : "/");
  if (!/^\/(?:[a-zA-Z0-9._~-]+\/)*$/.test(base) || base.includes("/../")) {
    throw new Error(
      "site.base: use a slash-delimited path such as / or /repository/ with a trailing slash",
    );
  }
  return { base, url, repository };
}
