import Hero from "../components/home/Hero";
import About from "../components/home/About";
import ProjectsGrid from "../components/home/ProjectsGrid";
import ContactSection from "../components/home/ContactSection";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { getFeaturedProjects } from "../lib/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />
      <About />
      <Section
        id="projects"
        eyebrow="Selected Work"
        title="Featured Projects"
        subtitle="A selection of recent C++, C#, and level-design work — engines, gameplay, networking, and worlds."
      >
        <ProjectsGrid projects={featured} />
        <div className="center-row">
          <Button to="/projects" variant="ghost" arrow>
            See all projects
          </Button>
        </div>
      </Section>
      <ContactSection />
    </>
  );
}
