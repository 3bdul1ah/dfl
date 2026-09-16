export default function Navbar() {
  return (
    <nav>
      {" "}
      <div className="nav-brand">
        {"AI "}
        <span>{"Airport"}</span>
        {" Automation"}
      </div>{" "}
      <ul>
        {" "}
        <li>
          <a href="#about">{"About"}</a>
        </li>{" "}
        <li>
          <a href="#platform">{"Platform"}</a>
        </li>{" "}
        <li>
          <a href="#architecture">{"Architecture"}</a>
        </li>{" "}
        <li>
          <a href="#simulation">{"Simulation"}</a>
        </li>{" "}
        <li>
          <a href="#experiments">{"Experiments"}</a>
        </li>{" "}
        <li>
          <a href="#team">{"Team"}</a>
        </li>{" "}
        <li>
          <a href="#contact">{"Contact"}</a>
        </li>{" "}
      </ul>{" "}
    </nav>
  );
}
