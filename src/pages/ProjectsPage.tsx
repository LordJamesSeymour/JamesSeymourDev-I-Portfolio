import { useMemo, useState } from "react";
import Section from "../components/ui/Section";
import ProjectsGrid from "../components/home/ProjectsGrid";
import ProjectFilter, { type CategoryFilter } from "../components/projects/ProjectFilter";
import Reveal from "../components/visual/Reveal";
import { getAllProjects, getUsedCategories } from "../lib/projects";
import { useSiteText } from "../content/content";

export default function ProjectsPage() {
  const [active, setActive] = useState<CategoryFilter>("All");
  const all = getAllProjects();
  const categories = getUsedCategories();
  const heading = useSiteText("projects-heading", "Projects");
  const subtitle = useSiteText(
    "projects-subtitle",
    "C++, C#, and level-design work — grouped by discipline. Filter to focus on one.",
  );

  const visible = useMemo(
    () => (active === "All" ? all : all.filter((p) => p.category === active)),
    [active, all],
  );

  return (
    <Section eyebrow="The Work" title={heading} subtitle={subtitle}>
      <ProjectFilter categories={categories} active={active} onChange={setActive} />

      {active === "All" ? (
        // Grouped view: one cinematic section per discipline.
        categories.map((category) => {
          const inCategory = all.filter((p) => p.category === category);
          return (
            <div className="category-group" key={category}>
              <Reveal as="header" className="category-group__head">
                <h2 className="category-group__title">{category}</h2>
                <span className="category-group__count">
                  {inCategory.length} project{inCategory.length === 1 ? "" : "s"}
                </span>
              </Reveal>
              <ProjectsGrid projects={inCategory} />
            </div>
          );
        })
      ) : (
        <ProjectsGrid projects={visible} />
      )}
    </Section>
  );
}
