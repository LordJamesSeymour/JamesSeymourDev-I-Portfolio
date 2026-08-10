import { profile } from "../../data/profile";
import { useSiteText } from "../../content/content";
import Button from "../ui/Button";
import Reveal from "../visual/Reveal";
import SocialLinks from "../ui/SocialLinks";
import HeroPortrait from "./HeroPortrait";

export default function Hero() {
  // Visible copy is editable via public/content/site/*.txt (fallbacks below).
  const eyebrow = useSiteText("hero-eyebrow", profile.role);
  const nameText = useSiteText("hero-title", profile.name);
  const tagline = useSiteText("hero-tagline", profile.tagline);
  const primaryCta = useSiteText("hero-primary-cta", "View Projects");
  const secondaryCta = useSiteText("hero-secondary-cta", "Get in Touch");

  // Data-driven "title card": accent the last word of the name (e.g. Seymour).
  const words = nameText.trim().split(" ");
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
                {eyebrow}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="hero__title">
                {lead && <>{lead} </>}
                <span className="hero__accent">{last}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="hero__tagline">{tagline}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero__actions">
                <Button to="/projects" arrow>
                  {primaryCta}
                </Button>
                <Button to="/#contact" variant="ghost">
                  {secondaryCta}
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
