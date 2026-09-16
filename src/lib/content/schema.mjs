// Small composable validators: no runtime validation library reaches the browser.
export function fail(field, message) {
  throw new Error(`${field}: ${message}`);
}
export const text = (value, field) => {
  if (typeof value !== "string" || !value.trim())
    fail(field, "expected non-empty text");
  return value.trim();
};
export const boolean = (value, field) => {
  if (typeof value !== "boolean") fail(field, "expected true or false");
  return value;
};
export const positiveInteger = (value, field) => {
  if (!Number.isInteger(value) || value <= 0)
    fail(field, "expected a positive integer");
  return value;
};
export const identifier = (value, field) => {
  text(value, field);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
    fail(field, "use a lowercase ID with letters, numbers and hyphens");
  return value;
};
export const optional =
  (validator, fallback = undefined) =>
  (value, field) =>
    value == null ? structuredClone(fallback) : validator(value, field);
export const enumeration = (values) => (value, field) => {
  if (!values.includes(value))
    fail(field, `expected one of: ${values.join(", ")}`);
  return value;
};
export const array = (validator) => (value, field) => {
  if (!Array.isArray(value)) fail(field, "expected a YAML list");
  return value.map((item, index) => validator(item, `${field}[${index}]`));
};
export const object = (shape) => (value, field) => {
  if (!value || typeof value !== "object" || Array.isArray(value))
    fail(field, "expected a YAML mapping");
  for (const key of Object.keys(value)) {
    if (!Object.hasOwn(shape, key))
      fail(
        `${field}.${key}`,
        "unknown field; check its spelling and the content guide",
      );
  }
  return Object.fromEntries(
    Object.entries(shape).map(([key, validator]) => [
      key,
      validator(value[key], `${field}.${key}`),
    ]),
  );
};
export const record = (validator) => (value, field) => {
  if (!value || typeof value !== "object" || Array.isArray(value))
    fail(field, "expected a YAML mapping");
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => {
      identifier(key, `${field}.${key}`);
      return [key, validator(entry, `${field}.${key}`)];
    }),
  );
};
export function unique(items, field, key = "id") {
  const seen = new Set();
  for (const [index, item] of items.entries()) {
    if (seen.has(item[key]))
      fail(`${field}[${index}].${key}`, `duplicate ${key} "${item[key]}"`);
    seen.add(item[key]);
  }
  return items;
}
export const collection = (validator) => (value, field) =>
  unique(array(validator)(value, field), field);
export function href(value, field) {
  text(value, field);
  if (/^#[a-z][a-z0-9-]*$/.test(value)) return value;
  if (/\s/.test(value)) fail(field, "URLs cannot contain whitespace");
  try {
    const url = new URL(value);
    if (
      ["http:", "https:"].includes(url.protocol) &&
      url.hostname &&
      !url.username &&
      !url.password
    )
      return value;
    if (
      url.protocol === "mailto:" &&
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(url.pathname)
    )
      return value;
  } catch {
    /* Report one actionable message below. */
  }
  return fail(
    field,
    "expected an http(s) URL, mailto address, or #section link",
  );
}
export function webUrl(value, field) {
  href(value, field);
  if (!/^https?:\/\//.test(value))
    fail(field, "expected an absolute http(s) URL");
  return value;
}
