import uploads from "../generated/uploads.json";
import { ImageAsset } from "./Media.jsx";

export default function Hero() {
  return (
    <section id="hero">
      {" "}
      <div className="hero-logos">
        {" "}
        <ImageAsset asset={uploads.images.ku} />{" "}
        <ImageAsset asset={uploads.images.dff} />{" "}
        <ImageAsset
          asset={uploads.images.aric}
          className="logo-aric"
          style={{ height: "52px" }}
        />{" "}
      </div>{" "}
      <div className="hero-collab">{"KU & DFF Collaboration"}</div>{" "}
      <h1>
        {"AI Powered"}
        <br />
        <span>{"Airport Automation"}</span>
      </h1>{" "}
      <p className="subtitle">
        {
          " A joint initiative by Khalifa University and Dubai Future Foundation to develop intelligent robotic systems that automate airport operations using large language models and symbolic planning. "
        }
      </p>{" "}
      <a href="#about" className="btn btn-primary">
        {"Explore Project"}
      </a>{" "}
      <a href="#experiments" className="btn btn-outline">
        {"Watch Videos"}
      </a>{" "}
      <div className="made-badge">
        {" "}
        <ImageAsset asset={uploads.images.madeInEmirates} />{" "}
      </div>{" "}
    </section>
  );
}
