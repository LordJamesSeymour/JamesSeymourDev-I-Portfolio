import { profile } from "../../data/profile";
import Section from "../ui/Section";
import Button from "../ui/Button";
import SocialLinks from "../ui/SocialLinks";

export default function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Contact"
      subtitle="Open to game programming & design roles."
    >
      <div className="contact">
        {profile.email && (
          <Button href={`mailto:${profile.email}`}>Email {profile.name.split(" ")[0]}</Button>
        )}

        {profile.cvUrl && (
          <Button href={profile.cvUrl} variant="ghost">
            Download CV
          </Button>
        )}

        {!profile.email && (
          <p className="muted-text">Reach me through any of the profiles below.</p>
        )}

        <SocialLinks variant="row" />
      </div>
    </Section>
  );
}
