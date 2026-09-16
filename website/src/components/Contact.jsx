import {
  SectionHeader,
  Paragraphs,
  ContentLink,
  ContentLinks,
} from "./Content.jsx";
export default function Contact({ data }) {
  const groups = data.groups.filter((group) => group.contacts.length);
  return (
    <section id="contact" aria-labelledby="contact-heading" tabIndex={-1}>
      <div className="section-inner">
        <SectionHeader id="contact" {...data} />
        <Paragraphs paragraphs={data.paragraphs} />
        {groups.length > 0 && (
          <div className="contact-groups">
            {groups.map((group) => (
              <div className="contact-group" key={group.id}>
                <h3>{group.name}</h3>
                {group.contacts.map((person) => (
                  <div className="contact-person" key={person.id}>
                    <h4>{person.name}</h4>
                    {person.role && <p>{person.role}</p>}
                    <ContentLinks links={person.links} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
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
