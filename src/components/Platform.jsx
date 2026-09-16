import { SectionHeader, Paragraphs } from "./Content.jsx";
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
          </div>
        </div>
      </div>
    </section>
  );
}
