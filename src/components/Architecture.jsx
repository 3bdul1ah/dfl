import uploads from "../generated/uploads.json";
import { ImageAsset } from "./Media.jsx";

export default function Architecture() {
  return (
    <section id="architecture">
      {" "}
      <div className="section-inner">
        {" "}
        <div className="arch-layout">
          {" "}
          <div className="arch-description">
            {" "}
            <p className="section-label">{"System Architecture"}</p>{" "}
            <h2>{"How It Works"}</h2> <div className="section-divider"></div>{" "}
            <ul className="arch-steps">
              {" "}
              <li>
                {" "}
                <div className="step-num">{"1"}</div>{" "}
                <div className="step-text">
                  {" "}
                  <strong>{"User Prompt"}</strong>{" "}
                  <span>
                    {
                      'Operator issues a natural-language task (e.g., "Sort all luggage in Hall A").'
                    }
                  </span>{" "}
                </div>{" "}
              </li>{" "}
              <li>
                {" "}
                <div className="step-num">{"2"}</div>{" "}
                <div className="step-text">
                  {" "}
                  <strong>{"MLLM Reasoning"}</strong>{" "}
                  <span>
                    {
                      "The MLLM processes robot metadata, sensory data (LiDAR, RGB-D, IMU), task parameters, and environment state."
                    }
                  </span>{" "}
                </div>{" "}
              </li>{" "}
              <li>
                {" "}
                <div className="step-num">{"3"}</div>{" "}
                <div className="step-text">
                  {" "}
                  <strong>{"Symbolic Plan Generation"}</strong>{" "}
                  <span>
                    {
                      "Generates a high-level plan decomposed into step-by-step sub-tasks and selects the appropriate tools."
                    }
                  </span>{" "}
                </div>{" "}
              </li>{" "}
              <li>
                {" "}
                <div className="step-num">{"4"}</div>{" "}
                <div className="step-text">
                  {" "}
                  <strong>{"Execution & Feedback"}</strong>{" "}
                  <span>
                    {
                      "The Execution Manager carries out actions, records robot states, and feeds results back into the loop."
                    }
                  </span>{" "}
                </div>{" "}
              </li>{" "}
              <li>
                {" "}
                <div className="step-num">{"5"}</div>{" "}
                <div className="step-text">
                  {" "}
                  <strong>{"States Memory"}</strong>{" "}
                  <span>
                    {
                      "Environment state is maintained as JSON/TF/XACRO, tracking all known objects and mission history."
                    }
                  </span>{" "}
                </div>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
          <div className="arch-image">
            {" "}
            <ImageAsset asset={uploads.images.architecture} />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
