import { SectionHeader, Paragraphs } from "./Content.jsx";
export default function About({ data }) {
  return (
    <section id="about" aria-labelledby="about-heading" tabIndex={-1}>
      <div
        className={`section-inner about-grid ${!data.features.length ? "single-column" : ""}`}
      >
        <div className="about-text">
          <SectionHeader id="about" {...data} />
          <Paragraphs paragraphs={data.paragraphs} />
        </div>
        {data.features.length > 0 && (
          <div className="feature-cards">
            {data.features.map((feature) => (
              <article className="feature-card" key={feature.id}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
