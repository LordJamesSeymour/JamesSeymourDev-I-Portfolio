import { profile } from "../../data/profile";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <p className="hero__eyebrow">{profile.role}</p>
        <h1 className="hero__title">{profile.name}</h1>
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__actions">
          <Button to="/projects">View Projects</Button>
          <Button href="/#contact" variant="ghost">
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
