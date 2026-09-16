import { useEffect, useRef } from "react";
import { visibleNavigation } from "../lib/sections.js";
import { ContentLink, RichText } from "./Content.jsx";

export default function Navbar({ content }) {
  const details = useRef(null);
  const links = visibleNavigation(content);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const reset = () => {
      if (desktop.matches && details.current) details.current.open = false;
    };
    desktop.addEventListener("change", reset);
    return () => desktop.removeEventListener("change", reset);
  }, []);
  function closeOnNavigate(event) {
    const link = event.target.closest("a");
    if (!link) return;
    details.current.open = false;
    if (link.hash)
      document
        .getElementById(link.hash.slice(1))
        ?.focus({ preventScroll: true });
  }
  const items = links.map((link) => (
    <li key={link.href}>
      <ContentLink href={link.href}>{link.label}</ContentLink>
    </li>
  ));
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {content.site.accessibility.skipLink}
      </a>
      <nav
        className="nav-inner"
        aria-label={content.site.accessibility.navigationLabel}
      >
        <a className="nav-brand" href="#hero">
          <RichText text={content.site.brand} />
        </a>
        {items.length > 0 && (
          <>
            <ul className="desktop-navigation">{items}</ul>
            <details
              className="mobile-navigation"
              ref={details}
              onKeyDown={(event) => {
                if (event.key === "Escape" && details.current.open) {
                  details.current.open = false;
                  details.current.querySelector("summary").focus();
                }
              }}
            >
              <summary>{content.site.accessibility.menuLabel}</summary>
              <ul onClick={closeOnNavigate}>{items}</ul>
            </details>
          </>
        )}
      </nav>
    </header>
  );
}
