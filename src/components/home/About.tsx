import { profile } from "../../data/profile";
import { useSiteText } from "../../content/content";
import Section from "../ui/Section";
import Tag from "../ui/Tag";

export default function About() {
  const heading = useSiteText("about-heading", "About");
  const body = useSiteText("about-body", profile.bio);

  return (
    <Section id="about" eyebrow="Profile" title={heading} muted>
      <p className="prose">{body}</p>

      <div className="about__columns">
        <div>
          <h3 className="about__subhead">Skills</h3>
          <div className="tag-row">
            {profile.skills.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </div>
        </div>
        <div>
          <h3 className="about__subhead">Tools</h3>
          <div className="tag-row">
            {profile.tools.map((tool) => (
              <Tag key={tool}>{tool}</Tag>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
