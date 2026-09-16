import siteContent from "./generated/content.json";
import { sectionVisible } from "./lib/sections.js";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Platform from "./components/Platform.jsx";
import Architecture from "./components/Architecture.jsx";
import Simulation from "./components/Simulation.jsx";
import CollectionSection from "./components/Collection.jsx";
import Team from "./components/Team.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App({ content = siteContent }) {
  return (
    <>
      <Navbar content={content} />
      <main id="main-content" tabIndex={-1}>
        <Hero content={content} />
        {sectionVisible("about", content) && <About data={content.about} />}
        {sectionVisible("platform", content) && (
          <Platform data={content.platform} />
        )}
        {sectionVisible("use-cases", content) && (
          <CollectionSection
            id="use-cases"
            data={content["use-cases"]}
            items={content["use-cases"].items}
          />
        )}
        {sectionVisible("architecture", content) && (
          <Architecture data={content.architecture} />
        )}
        {sectionVisible("simulation", content) && (
          <Simulation data={content.simulation} />
        )}
        {sectionVisible("experiments", content) && (
          <CollectionSection
            id="experiments"
            data={content.experiments}
            items={content.experiments.experiments}
          />
        )}
        {sectionVisible("projects", content) && (
          <CollectionSection
            id="projects"
            data={content.projects}
            items={content.projects.projects}
          />
        )}
        {sectionVisible("team", content) && <Team data={content.team} />}
        {sectionVisible("contact", content) && (
          <Contact data={content.contact} />
        )}
      </main>
      <Footer site={content.site} />
    </>
  );
}
