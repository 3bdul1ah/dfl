import { SectionHeader, TagList, ContentLinks } from "./Content.jsx";
import { ImageAsset, VideoAsset } from "./Media.jsx";

export function CollectionCard({ item, sectionId }) {
  const heading = `${sectionId}-${item.id}`;
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
        {item.status && (
          <p className={`item-status status-${item.status}`}>{item.status}</p>
        )}
        <h3 id={heading}>{item.title}</h3>
        {item.description && <p>{item.description}</p>}
        <TagList tags={item.tags} />
        <ContentLinks links={item.links} />
      </div>
    </article>
  );
}
export default function CollectionSection({ id, data, items }) {
  if (!items.length) return null;
  return (
    <section id={id} aria-labelledby={`${id}-heading`} tabIndex={-1}>
      <div className="section-inner">
        <SectionHeader id={id} {...data} />
        <div className="collection-grid">
          {items.map((item) => (
            <CollectionCard key={item.id} item={item} sectionId={id} />
          ))}
        </div>
      </div>
    </section>
  );
}
