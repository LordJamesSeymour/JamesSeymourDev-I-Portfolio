import { profile } from "../../data/profile";
import Section from "../ui/Section";
import Tag from "../ui/Tag";

export default function About() {
  return (
    <Section id="about" eyebrow="Profile" title="About" muted>
      <p className="prose">{profile.bio}</p>

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
