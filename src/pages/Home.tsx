import Hero from "../components/home/Hero";
import About from "../components/home/About";
import ProjectsGrid from "../components/home/ProjectsGrid";
import ContactSection from "../components/home/ContactSection";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { getFeaturedProjects } from "../lib/projects";
import { useSiteText } from "../content/content";

export default function Home() {
  const featured = getFeaturedProjects();
  const featuredHeading = useSiteText("featured-heading", "Featured Projects");
  const featuredSubtitle = useSiteText(
    "featured-subtitle",
    "A selection of recent C++, C#, and level-design work — engines, gameplay, networking, and worlds.",
  );
  const seeAllCta = useSiteText("featured-see-all-cta", "See all projects");

  return (
    <>
      <Hero />
      <About />
      <Section id="projects" eyebrow="Selected Work" title={featuredHeading} subtitle={featuredSubtitle}>
        <ProjectsGrid projects={featured} />
        <div className="center-row">
          <Button to="/projects" variant="ghost" arrow>
            {seeAllCta}
          </Button>
        </div>
      </Section>
      <ContactSection />
    </>
  );
}
