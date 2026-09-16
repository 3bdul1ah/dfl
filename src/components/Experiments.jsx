import uploads from "../generated/uploads.json";
import { VideoAsset } from "./Media.jsx";

function ExperimentCard({ experiment }) {
  return (
    <div className="exp-card">
      <VideoAsset asset={experiment.video} />
      <div className="exp-meta">
        <h4>{experiment.title}</h4>
        <p>{experiment.description}</p>
      </div>
    </div>
  );
}

export default function Experiments({ experiments = uploads.experiments }) {
  return (
    <section id="experiments">
      <div className="section-inner">
        <p className="section-label">Real-World Experiments</p>
        <h2>Hardware Demonstrations</h2>
        <div className="section-divider"></div>
        <div className="exp-grid">
          {experiments.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </div>
      </div>
    </section>
  );
}
