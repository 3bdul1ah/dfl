import { RichText, ContentLink } from "./Content.jsx";
import { ImageAsset } from "./Media.jsx";
import { sectionVisible } from "../lib/sections.js";

export default function Hero({ content }) {
  const hero = content.site.hero;
  const actions = hero.actions.filter(
    (link) =>
      !link.href.startsWith("#") ||
      link.href === "#hero" ||
      sectionVisible(link.href.slice(1), content),
  );
  return (
    <section id="hero" aria-labelledby="hero-heading" tabIndex={-1}>
      <div className="section-inner">
        {hero.logos.length > 0 && (
          <div className="hero-logos">
            {hero.logos.map((logo) => (
              <ImageAsset
                key={logo.id}
                asset={logo}
                loading="eager"
                className={logo.framed ? "logo-framed" : ""}
              />
            ))}
          </div>
        )}
        {hero.tagline && <p className="hero-collab">{hero.tagline}</p>}
        <h1 id="hero-heading">
          {hero.title.map((line, index) => (
            <span className="hero-title-line" key={index}>
              <RichText text={line} />
            </span>
          ))}
        </h1>
        {hero.description && <p className="subtitle">{hero.description}</p>}
        {actions.length > 0 && (
          <div className="hero-actions">
            {actions.map((link) => (
              <ContentLink
                key={link.href}
                className={`btn btn-${link.variant}`}
                href={link.href}
              >
                {link.label}
              </ContentLink>
            ))}
          </div>
        )}
        {hero.badge && (
          <div className="made-badge">
            <ImageAsset asset={hero.badge} loading="eager" />
          </div>
        )}
      </div>
    </section>
  );
}
