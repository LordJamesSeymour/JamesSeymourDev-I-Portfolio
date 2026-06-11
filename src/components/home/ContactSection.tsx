import { profile } from "../../data/profile";
import { useSiteText } from "../../content/content";
import Section from "../ui/Section";
import Button from "../ui/Button";
import SocialLinks from "../ui/SocialLinks";

export default function ContactSection() {
  const heading = useSiteText("contact-heading", "Contact");
  const body = useSiteText("contact-body", "Open to game programming & design roles.");

  return (
    <Section id="contact" eyebrow="Get in touch" title={heading} subtitle={body}>
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
