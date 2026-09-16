export default function About() {
  return (
    <section id="about">
      {" "}
      <div className="section-inner">
        {" "}
        <div className="about-grid">
          {" "}
          <div className="about-text">
            {" "}
            <p className="section-label">{"About the Project"}</p>{" "}
            <h2>{"Intelligent Robotics for Modern Airports"}</h2>{" "}
            <div className="section-divider"></div>{" "}
            <p>
              {" This project, hosted at the "}
              <strong>
                {"Advanced Research and Innovation Center (ARIC)"}
              </strong>
              {
                " within Khalifa University, aims to fully automate common airport operations including luggage handling from check-in, conveyor belts, UMD processes, carts, and more. "
              }
            </p>{" "}
            <p>
              {" At its core, a "}
              <strong>
                {"central Multimodal Large Language Model (MLLM)"}
              </strong>
              {
                " receives natural language task instructions from operators, processes contextual information about the robot's capabilities, sensor data, and environment state, then generates and executes high-level symbolic plans to accomplish complex airport tasks autonomously. "
              }
            </p>{" "}
            <p>
              {
                " The robot platform is proudly developed and manufactured in the United Arab Emirates, reflecting the UAE's vision for local innovation and advanced technology development. "
              }
            </p>{" "}
          </div>{" "}
          <div className="feature-cards">
            {" "}
            <div className="feature-card">
              {" "}
              <h4>{"Luggage Handling"}</h4>{" "}
              <p>
                {
                  "Automated sorting, transport, and management of luggage across check-in and belts."
                }
              </p>{" "}
            </div>{" "}
            <div className="feature-card">
              {" "}
              <h4>{"Multimodal LLM"}</h4>{" "}
              <p>
                {
                  "GPT-4, LLaMA, Qwen and other frontier models driving autonomous decision-making."
                }
              </p>{" "}
            </div>{" "}
            <div className="feature-card">
              {" "}
              <h4>{"Symbolic Planning"}</h4>{" "}
              <p>
                {
                  "High-level task decomposition into executable robot action sequences."
                }
              </p>{" "}
            </div>{" "}
            <div className="feature-card">
              {" "}
              <h4>{"Tool Pool"}</h4>{" "}
              <p>
                {
                  "Rich library of perception, manipulation, and navigation capabilities for robots."
                }
              </p>{" "}
            </div>{" "}
            <div className="feature-card">
              {" "}
              <h4>{"Safety Monitoring"}</h4>{" "}
              <p>
                {
                  "Continuous LiDAR-based safety checks and speed limits around humans."
                }
              </p>{" "}
            </div>{" "}
            <div className="feature-card">
              {" "}
              <h4>{"Simulation"}</h4>{" "}
              <p>
                {
                  "NVIDIA Isaac Sim-based testing before real-world airport deployment."
                }
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
