const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
export function metadata(site) {
  const title = site.seo.title ?? site.name;
  const description = site.seo.description ?? site.description;
  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${escape(title)}">`,
    `<meta property="og:description" content="${escape(description)}">`,
    `<meta name="twitter:card" content="${site.seo.image && site.url ? "summary_large_image" : "summary"}">`,
    `<meta name="twitter:title" content="${escape(title)}">`,
    `<meta name="twitter:description" content="${escape(description)}">`,
  ];
  if (site.url) {
    tags.push(
      `<link rel="canonical" href="${escape(site.url)}">`,
      `<meta property="og:url" content="${escape(site.url)}">`,
    );
    if (site.seo.image) {
      const url = new URL(site.seo.image.url, site.url).href;
      tags.push(
        `<meta property="og:image" content="${escape(url)}">`,
        `<meta name="twitter:image" content="${escape(url)}">`,
        `<meta property="og:image:alt" content="${escape(site.seo.image.alt)}">`,
      );
    }
  }
  if (site.favicon)
    tags.push(
      `<link rel="icon" href="${escape(site.base + site.favicon.url)}">`,
    );
  return tags.join("\n    ");
}
export function applyMetadata(html, site) {
  return html
    .replace('lang="en"', `lang="${escape(site.language)}"`)
    .replace("<!-- site-metadata -->", () => metadata(site));
}
