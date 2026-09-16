import { SectionHeader, Paragraphs } from "./Content.jsx";
import { ImageAsset } from "./Media.jsx";
export default function Architecture({ data }) {
  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      tabIndex={-1}
    >
      <div
        className={`section-inner arch-layout ${!data.image ? "single-column" : ""}`}
      >
        <div className="arch-description">
          <SectionHeader id="architecture" {...data} />
          <div className="section-intro">
            <Paragraphs paragraphs={data.paragraphs} />
          </div>
          {data.steps.length > 0 && (
            <ol className="arch-steps">
              {data.steps.map((step, index) => (
                <li key={step.id}>
                  <span className="step-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div className="step-text">
                    {step.layer && <p className="step-layer">{step.layer}</p>}
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
          {data.principles.length > 0 && (
            <div className="detail-grid">
              {data.principles.map((principle) => (
                <div className="detail-item" key={principle.id}>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {data.image && (
          <div className="arch-image">
            <ImageAsset asset={data.image} />
          </div>
        )}
      </div>
    </section>
  );
}
