import { SectionHeader, Paragraphs, TagList } from "./Content.jsx";
import { VideoAsset } from "./Media.jsx";
export default function Simulation({ data }) {
  return (
    <section id="simulation" aria-labelledby="simulation-heading" tabIndex={-1}>
      <div
        className={`section-inner sim-layout ${!data.video ? "single-column" : ""}`}
      >
        {data.video && (
          <div className="sim-video">
            <VideoAsset asset={data.video} label={data.title} />
          </div>
        )}
        <div className="sim-description">
          <SectionHeader id="simulation" {...data} />
          <Paragraphs paragraphs={data.paragraphs} />
          <TagList tags={data.tags} />
        </div>
      </div>
    </section>
  );
}
