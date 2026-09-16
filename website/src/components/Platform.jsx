import { SectionHeader, Paragraphs, ItemStatus } from "./Content.jsx";
import { ImageAsset } from "./Media.jsx";
export default function Platform({ data }) {
  return (
    <section id="platform" aria-labelledby="platform-heading" tabIndex={-1}>
      <div className="section-inner">
        <SectionHeader id="platform" {...data} />
        <div
          className={`platform-layout ${!data.image && !data.imagePlaceholder ? "single-column" : ""}`}
        >
          {(data.image || data.imagePlaceholder) && (
            <div
              className={data.image ? "platform-image" : "platform-image-box"}
            >
              {data.image ? (
                <ImageAsset asset={data.image} />
              ) : (
                <>
                  <svg
                    width="64"
                    height="64"
                    fill="none"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                  >
                    <rect
                      x="8"
                      y="20"
                      width="48"
                      height="32"
                      rx="6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                    <rect
                      x="22"
                      y="8"
                      width="20"
                      height="14"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M32 22v14"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="20"
                      cy="54"
                      r="5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="44"
                      cy="54"
                      r="5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                  </svg>
                  <span>{data.imagePlaceholder}</span>
                </>
              )}
            </div>
          )}
          <div className="platform-description">
            <Paragraphs paragraphs={data.paragraphs} />
            {data.attribution && (
              <p className="platform-attribution">
                {data.attribution.label}{" "}
                <strong>{data.attribution.name}</strong>
              </p>
            )}
            {data.specifications.length > 0 && (
              <dl className="specs-grid">
                {data.specifications.map((spec) => (
                  <div className="spec-item" key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {data.roadmap?.items.length > 0 && (
              <div className="platform-details">
                <h3>{data.roadmap.title}</h3>
                <div className="detail-grid">
                  {data.roadmap.items.map((item) => (
                    <article className="detail-item" key={item.id}>
                      <ItemStatus status={item.status} />
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {data.tools?.items.length > 0 && (
          <div className="platform-details">
            <h3>{data.tools.title}</h3>
            <div className="detail-grid">
              {data.tools.items.map((tool) => (
                <article className="detail-item" key={tool.id}>
                  <ItemStatus status={tool.status} />
                  <h4>{tool.title}</h4>
                  <p>{tool.description}</p>
                  <p className="tool-use-cases">
                    Use cases: {tool.useCases.join(", ")}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
