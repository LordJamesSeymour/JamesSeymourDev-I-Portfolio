import { Link, NavLink } from "react-router-dom";
import { profile } from "../../data/profile";
import { useSiteText } from "../../content/content";
import Button from "../ui/Button";

/** Initials for the brand mark (e.g. "James Seymour" → "JS"). */
function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Header() {
  // Brand name editable via public/content/site/hero-name.txt (shared with the footer).
  const brandName = useSiteText("hero-name", profile.name);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">
            {initials(brandName)}
          </span>
          {brandName}
        </Link>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end className="nav__link nav__link--secondary">
            Home
          </NavLink>
          <NavLink to="/projects" className="nav__link">
            Projects
          </NavLink>
          <a className="nav__link nav__link--secondary" href="/#about">
            About
          </a>
          <Button href="/#contact" className="nav__cta">
            Get in touch
          </Button>
        </nav>
      </div>
    </header>
  );
}
