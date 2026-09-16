import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Platform from "./components/Platform.jsx";
import Architecture from "./components/Architecture.jsx";
import Simulation from "./components/Simulation.jsx";
import Experiments from "./components/Experiments.jsx";
import Team from "./components/Team.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Platform />
      <Architecture />
      <Simulation />
      <Experiments />
      <Team />
      <Contact />
      <Footer />
    </>
  );
}
