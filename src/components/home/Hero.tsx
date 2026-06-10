import { profile } from "../../data/profile";
import Button from "../ui/Button";
import Reveal from "../visual/Reveal";
import SocialLinks from "../ui/SocialLinks";
import HeroPortrait from "./HeroPortrait";

export default function Hero() {
  // Data-driven "title card": accent the last word of the name (e.g. Seymour).
  const words = profile.name.trim().split(" ");
  const lead = words.slice(0, -1).join(" ");
  const last = words[words.length - 1];

  return (
    <section className="hero">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__copy">
            <Reveal>
              <p className="hero__eyebrow">
                <span className="hero__eyebrow-dot" aria-hidden="true" />
                {profile.role}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="hero__title">
                {lead && <>{lead} </>}
                <span className="hero__accent">{last}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="hero__tagline">{profile.tagline}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero__actions">
                <Button to="/projects" arrow>
                  View Projects
                </Button>
                <Button href="/#contact" variant="ghost">
                  Get in Touch
                </Button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <SocialLinks variant="hero" />
            </Reveal>
          </div>
          <Reveal className="hero__aside" delay={120}>
            <HeroPortrait />
          </Reveal>
        </div>
      </div>
      <span className="hero__scroll" aria-hidden="true">
        Scroll to explore
      </span>
    </section>
  );
}
