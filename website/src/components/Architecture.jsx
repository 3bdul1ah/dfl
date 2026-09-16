import { SectionHeader } from "./Content.jsx";
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
          {data.steps.length > 0 && (
            <ol className="arch-steps">
              {data.steps.map((step, index) => (
                <li key={step.id}>
                  <span className="step-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div className="step-text">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
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
