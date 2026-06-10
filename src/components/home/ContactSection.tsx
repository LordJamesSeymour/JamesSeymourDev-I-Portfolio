import { profile } from "../../data/profile";
import Section from "../ui/Section";
import Button from "../ui/Button";

export default function ContactSection() {
  return (
    <Section id="contact" title="Contact" subtitle="Open to game programming & design roles.">
      <div className="contact">
        {profile.email ? (
          <Button href={`mailto:${profile.email}`}>Email {profile.name.split(" ")[0]}</Button>
        ) : (
          <p className="muted-text">TODO: add a public contact email in src/data/profile.ts.</p>
        )}

        {profile.cvUrl && (
          <Button href={profile.cvUrl} variant="ghost">
            Download CV
          </Button>
        )}

        <nav className="contact__links" aria-label="Profiles">
          {profile.links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </Section>
  );
}
