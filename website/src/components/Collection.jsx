import {
  SectionHeader,
  TagList,
  ContentLinks,
  Paragraphs,
  ItemStatus,
} from "./Content.jsx";
import { ImageAsset, VideoAsset } from "./Media.jsx";

export function CollectionCard({ item, sectionId, headingLevel = 3 }) {
  const heading = `${sectionId}-${item.id}`;
  const Heading = `h${headingLevel}`;
  return (
    <article className="collection-card" aria-labelledby={heading}>
      {item.video ? (
        <div className="card-media">
          <VideoAsset asset={item.video} label={item.title} />
        </div>
      ) : (
        item.image && (
          <div className="card-media">
            <ImageAsset asset={item.image} alt={item.image.alt || item.title} />
          </div>
        )
      )}
      <div className="card-body">
        <ItemStatus status={item.status} />
        <Heading id={heading}>{item.title}</Heading>
        {item.description && <p>{item.description}</p>}
        <TagList tags={item.tags} />
        <ContentLinks links={item.links} />
      </div>
    </article>
  );
}
export default function CollectionSection({ id, data, items }) {
  if (!items.length) return null;
  const groups = (data.categories ?? [])
    .map((category) => ({
      ...category,
      items: items.filter((item) => item.category === category.id),
    }))
    .filter((group) => group.items.length);
  const ungrouped = items.filter((item) => !item.category);
  return (
    <section id={id} aria-labelledby={`${id}-heading`} tabIndex={-1}>
      <div className="section-inner">
        <SectionHeader id={id} {...data} />
        <div className="section-intro">
          <Paragraphs paragraphs={data.paragraphs} />
        </div>
        {groups.map((group) => (
          <div className="collection-group" key={group.id}>
            <h3 id={`${id}-category-${group.id}`}>{group.title}</h3>
            {group.description && (
              <p className="group-description">{group.description}</p>
            )}
            <div className="collection-grid">
              {group.items.map((item) => (
                <CollectionCard
                  key={item.id}
                  item={item}
                  sectionId={id}
                  headingLevel={4}
                />
              ))}
            </div>
          </div>
        ))}
        {ungrouped.length > 0 && (
          <div className="collection-grid">
            {ungrouped.map((item) => (
              <CollectionCard key={item.id} item={item} sectionId={id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
