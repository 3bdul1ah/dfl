import { ContentLink, ContentLinks } from "./Content.jsx";
export default function Footer({ site }) {
  return (
    <footer className="site-footer">
      <p>
        © {site.footer.year} {site.name}
        {site.footer.links.length > 0 && (
          <>
            {" "}
            ·{" "}
            {site.footer.links.map((link, index) => (
              <span key={link.href}>
                {index > 0 && " & "}
                <ContentLink href={link.href}>{link.label}</ContentLink>
              </span>
            ))}
          </>
        )}
      </p>
      <ContentLinks
        links={[
          ...site.socials,
          ...(site.repository && site.footer.sourceLabel
            ? [{ label: site.footer.sourceLabel, href: site.repository }]
            : []),
        ]}
      />
    </footer>
  );
}
