// Deliberately limited rich text: emphasis without HTML injection or a Markdown runtime.
export function RichText({ text = "" }) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={index}>{part.slice(2, -2)}</strong>
      ) : (
        part
      ),
    );
}
export function Paragraphs({ paragraphs = [] }) {
  return paragraphs.map((paragraph, index) => (
    <p key={index}>
      <RichText text={paragraph} />
    </p>
  ));
}
export function SectionHeader({ id, title, label }) {
  return (
    <div className="section-heading">
      {label && <p className="section-label">{label}</p>}
      <h2 id={`${id}-heading`}>{title}</h2>
      <div className="section-divider" aria-hidden="true" />
    </div>
  );
}
export function ContentLink({ href, children, ...props }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
export function ContentLinks({ links = [], className = "" }) {
  if (!links.length) return null;
  return (
    <ul className={`content-links ${className}`}>
      {links.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          <ContentLink href={link.href}>{link.label}</ContentLink>
        </li>
      ))}
    </ul>
  );
}
export function TagList({ tags = [] }) {
  if (!tags.length) return null;
  return (
    <ul className="tag-list">
      {tags.map((tag, index) => (
        <li key={`${tag}-${index}`}>{tag}</li>
      ))}
    </ul>
  );
}
