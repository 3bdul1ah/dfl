import { SectionHeader, Paragraphs, ContentLink } from "./Content.jsx";
export default function Contact({ data }) {
  return (
    <section id="contact" aria-labelledby="contact-heading" tabIndex={-1}>
      <div className="section-inner">
        <SectionHeader id="contact" {...data} />
        <Paragraphs paragraphs={data.paragraphs} />
        {data.links.length > 0 && (
          <div className="contact-actions">
            {data.links.map((link) => (
              <ContentLink
                key={link.href}
                href={link.href}
                className="contact-link"
              >
                {link.label}
              </ContentLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
