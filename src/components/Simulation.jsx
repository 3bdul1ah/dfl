import uploads from "../generated/uploads.json";
import { VideoAsset } from "./Media.jsx";

export default function Simulation() {
  return (
    <section id="simulation">
      {" "}
      <div className="section-inner">
        {" "}
        <div className="sim-layout">
          {" "}
          <div className="sim-video">
            {" "}
            <VideoAsset asset={uploads.simulation.video} />{" "}
          </div>{" "}
          <div className="sim-description">
            {" "}
            <p className="section-label">{"Simulation Environment"}</p>{" "}
            <h2>{"Realistic Airport Scenario in NVIDIA Isaac Sim"}</h2>{" "}
            <div className="section-divider"></div>{" "}
            <p>
              {
                " To accelerate development and safely validate our framework before real-world deployment, we have constructed a high-fidelity airport scenario within "
              }
              <strong>{"NVIDIA Isaac Sim"}</strong>
              {
                ". The environment faithfully replicates key airport operational areas including baggage claim halls, check-in counters, conveyor belts, and UMD zones. "
              }
            </p>{" "}
            <p>
              {
                " The simulation enables full end-to-end testing of the MLLM-driven pipeline — from natural language task input through symbolic plan generation to robot execution — under diverse conditions and edge cases that would be difficult or unsafe to test in a live airport environment. "
              }
            </p>{" "}
            <div>
              {" "}
              <span className="sim-tag">{"NVIDIA Isaac Sim"}</span>{" "}
              <span className="sim-tag">{"Physics-Based Rendering"}</span>{" "}
              <span className="sim-tag">{"Sim-to-Real Transfer"}</span>{" "}
              <span className="sim-tag">{"Baggage Operations"}</span>{" "}
              <span className="sim-tag">{"Multi-Robot Testing"}</span>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
