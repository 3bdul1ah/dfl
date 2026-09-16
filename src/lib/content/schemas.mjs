import {
  array,
  boolean,
  collection,
  enumeration,
  identifier,
  object,
  optional,
  positiveInteger,
  record,
  text,
  href,
  webUrl,
  unique,
  fail,
} from "./schema.mjs";

const strings = optional(array(text), []);
const imageFields = {
  path: text,
  alt: optional(
    (value) =>
      typeof value === "string" ? value : fail("image.alt", "expected text"),
    "",
  ),
};
export const image = object(imageFields);
const video = object({
  path: text,
  types: optional(
    array(
      enumeration(["video/mp4", "video/quicktime", "video/webm", "video/ogg"]),
    ),
  ),
  poster: optional(image),
  aspectRatio: optional(text),
});
const link = object({ label: text, href });
const links = optional(array(link), []);
const section = {
  enabled: optional(boolean, true),
  title: text,
  label: optional(text),
};
const paragraphs = optional(array(text), []);
const item = object({
  id: identifier,
  title: text,
  description: optional(text),
  status: optional(enumeration(["planned", "active", "completed", "archived"])),
  image: optional(image),
  video: optional(video),
  tags: strings,
  links,
});
const member = object({
  id: optional(identifier),
  name: text,
  initials: optional(text),
  role: optional(text),
  badge: optional(text),
  bio: optional(text),
  image: optional(image),
  links,
});
const members = (value, field) => {
  const parsed = array(member)(value ?? [], field).map((entry) => ({
    ...entry,
    id:
      entry.id ??
      entry.name
        .normalize("NFKD")
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/^-|-$/g, ""),
  }));
  return unique(parsed, field);
};
export const schemas = {
  site: object({
    name: text,
    brand: text,
    description: text,
    language: optional(text, "en"),
    url: optional(webUrl),
    repository: optional(webUrl),
    base: optional(text),
    seo: optional(
      object({
        title: optional(text),
        description: optional(text),
        image: optional(image),
      }),
      {},
    ),
    favicon: optional(image),
    navigation: links,
    socials: links,
    hero: object({
      tagline: optional(text),
      title: array(text),
      description: optional(text),
      logos: optional(
        collection(
          object({
            id: identifier,
            ...imageFields,
            framed: optional(boolean, false),
          }),
        ),
        [],
      ),
      actions: optional(
        array(
          object({
            label: text,
            href,
            variant: optional(enumeration(["primary", "outline"]), "primary"),
          }),
        ),
        [],
      ),
      badge: optional(image),
    }),
    footer: object({
      year: positiveInteger,
      links,
      sourceLabel: optional(text),
    }),
    accessibility: object({
      skipLink: text,
      navigationLabel: text,
      menuLabel: text,
    }),
  }),
  about: object({
    ...section,
    paragraphs,
    features: optional(
      collection(object({ id: identifier, title: text, description: text })),
      [],
    ),
  }),
  platform: object({
    ...section,
    paragraphs,
    image: optional(image),
    imagePlaceholder: optional(text),
    attribution: optional(object({ label: text, name: text })),
    specifications: optional(array(object({ label: text, value: text })), []),
  }),
  architecture: object({
    ...section,
    image: optional(image),
    steps: optional(
      collection(object({ id: identifier, title: text, description: text })),
      [],
    ),
  }),
  simulation: object({
    ...section,
    paragraphs,
    video: optional(video),
    tags: strings,
  }),
  experiments: object({
    ...section,
    experiments: optional(collection(item), []),
  }),
  team: object({
    ...section,
    teams: record(object({ name: text, description: optional(text), members })),
  }),
  projects: object({ ...section, projects: optional(collection(item), []) }),
  contact: object({ ...section, paragraphs, links }),
};
