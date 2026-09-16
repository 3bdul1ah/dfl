export default function Contact() {
  return (
    <section id="contact">
      {" "}
      <div className="section-inner">
        {" "}
        <p className="section-label" style={{ color: "var(--aric-blue)" }}>
          {"Get in Touch"}
        </p>{" "}
        <h2>{"Interested in Collaboration?"}</h2>{" "}
        <div
          className="section-divider"
          style={{ margin: "1rem auto 1.5rem" }}
        ></div>{" "}
        <p>
          {
            " We welcome partnerships, academic collaboration, and industry engagement. Reach out to the principal investigator to learn more about the project. "
          }
        </p>{" "}
        <a href="mailto:yahya.zweiri@ku.ac.ae" className="contact-link">
          {" ✉ yahya.zweiri@ku.ac.ae "}
        </a>{" "}
      </div>{" "}
    </section>
  );
}
