import { Link, NavLink } from "react-router-dom";
import { profile } from "../../data/profile";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand">
          {profile.name}
        </Link>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end className="nav__link">
            Home
          </NavLink>
          <NavLink to="/projects" className="nav__link">
            Projects
          </NavLink>
          <a className="nav__link" href="/#contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
