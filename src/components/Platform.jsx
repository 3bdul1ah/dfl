export default function Platform() {
  return (
    <section id="platform">
      {" "}
      <div className="section-inner">
        {" "}
        <p className="section-label">{"Robot Platform"}</p>{" "}
        <h2>{"Picker 2.0"}</h2> <div className="section-divider"></div>{" "}
        <div className="platform-layout">
          {" "}
          <div className="platform-image-box">
            {" "}
            <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
              <rect
                x="8"
                y="20"
                width="48"
                height="32"
                rx="6"
                stroke="#7aaccc"
                strokeWidth="2.5"
              ></rect>
              <rect
                x="22"
                y="8"
                width="20"
                height="14"
                rx="4"
                stroke="#7aaccc"
                strokeWidth="2.5"
              ></rect>
              <line
                x1="32"
                y1="22"
                x2="32"
                y2="36"
                stroke="#7aaccc"
                strokeWidth="2.5"
              ></line>
              <circle
                cx="20"
                cy="54"
                r="5"
                stroke="#7aaccc"
                strokeWidth="2.5"
              ></circle>
              <circle
                cx="44"
                cy="54"
                r="5"
                stroke="#7aaccc"
                strokeWidth="2.5"
              ></circle>
            </svg>{" "}
            <span>{"Image coming soon"}</span>{" "}
          </div>{" "}
          <div>
            {" "}
            <p
              style={{
                color: "var(--muted)",
                fontSize: ".95rem",
                marginBottom: ".5rem",
              }}
            >
              {" The "}
              <strong>{"Picker 2.0"}</strong>
              {
                " is a mobile manipulation platform designed and built entirely at "
              }
              <strong>{"Dubai Future Foundation (DFL)"}</strong>
              {
                ". It serves as the primary hardware platform for validating the AI airport automation framework in real-world conditions. "
              }
            </p>{" "}
            <div className="dfl-badge">
              {"🏭 Designed & Built by "}
              <span>{"Dubai Future Foundation"}</span>
            </div>{" "}
            <div className="specs-grid">
              {" "}
              <div className="spec-item">
                <div className="spec-label">{"Payload Capacity"}</div>
                <div className="spec-value">{"TBD"}</div>
              </div>{" "}
              <div className="spec-item">
                <div className="spec-label">{"Mobile Base"}</div>
                <div className="spec-value">{"TBD"}</div>
              </div>{" "}
              <div className="spec-item">
                <div className="spec-label">{"Manipulator DOF"}</div>
                <div className="spec-value">{"TBD"}</div>
              </div>{" "}
              <div className="spec-item">
                <div className="spec-label">{"End Effector"}</div>
                <div className="spec-value">{"TBD"}</div>
              </div>{" "}
              <div className="spec-item">
                <div className="spec-label">{"Sensors"}</div>
                <div className="spec-value">{"TBD"}</div>
              </div>{" "}
              <div className="spec-item">
                <div className="spec-label">{"Battery Life"}</div>
                <div className="spec-value">{"TBD"}</div>
              </div>{" "}
              <div className="spec-item">
                <div className="spec-label">{"Max Speed"}</div>
                <div className="spec-value">{"TBD"}</div>
              </div>{" "}
              <div className="spec-item">
                <div className="spec-label">{"Dimensions"}</div>
                <div className="spec-value">{"TBD"}</div>
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
