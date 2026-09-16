import { SectionHeader, ContentLinks } from "./Content.jsx";
import { ImageAsset } from "./Media.jsx";

export function TeamMemberCard({ member, groupId }) {
  const initials =
    member.initials ??
    member.name
      .split(/\s+/u)
      .slice(0, 2)
      .map((part) => Array.from(part)[0])
      .join("");
  return (
    <article
      className="member-card"
      aria-labelledby={`member-${groupId}-${member.id}`}
    >
      {member.image ? (
        <ImageAsset
          asset={member.image}
          alt={member.image.alt || member.name}
          className="member-portrait"
        />
      ) : (
        <div className="avatar" aria-hidden="true">
          {initials}
        </div>
      )}
      <div className="member-info">
        <h4 id={`member-${groupId}-${member.id}`}>
          {member.name}
          {member.badge && (
            <>
              {" "}
              <span className="member-badge">{member.badge}</span>
            </>
          )}
        </h4>
        {member.role && <p className="member-role">{member.role}</p>}
        {member.bio && <p className="member-bio">{member.bio}</p>}
        <ContentLinks links={member.links} />
      </div>
    </article>
  );
}
export default function Team({ data }) {
  const groups = Object.entries(data.teams).filter(
    ([, group]) => group.members.length,
  );
  if (!groups.length) return null;
  return (
    <section id="team" aria-labelledby="team-heading" tabIndex={-1}>
      <div className="section-inner">
        <SectionHeader id="team" {...data} />
        <div className="team-groups">
          {groups.map(([id, group]) => (
            <div className="team-group" key={id}>
              <h3 className="team-group-title" id={`team-${id}`}>
                {group.name}
              </h3>
              {group.description && (
                <p className="team-description">{group.description}</p>
              )}
              <div className="team-grid">
                {group.members.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    groupId={id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
