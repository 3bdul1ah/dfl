export function sectionVisible(name, content) {
  const section = content[name];
  if (!section || section.enabled === false) return false;
  if (name === "experiments" || name === "projects")
    return section[name].length > 0;
  if (name === "use-cases") return section.items.length > 0;
  if (name === "team")
    return Object.values(section.teams).some(
      (group) => group.members.length > 0,
    );
  return true;
}
export function visibleNavigation(content) {
  return content.site.navigation.filter(
    (link) =>
      !link.href.startsWith("#") ||
      link.href === "#hero" ||
      sectionVisible(link.href.slice(1), content),
  );
}
