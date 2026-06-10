import type { ProjectCaseStudy as CaseStudy } from "../../types/project";

interface ProjectCaseStudyProps {
  caseStudy?: CaseStudy;
}

/** Renders whichever case-study sections are present. Empty sections are skipped. */
export default function ProjectCaseStudy({ caseStudy }: ProjectCaseStudyProps) {
  if (!caseStudy) {
    return <p className="muted-text">Case study coming soon.</p>;
  }

  const textSections: { label: string; value?: string }[] = [
    { label: "Overview", value: caseStudy.overview },
    { label: "My Role", value: caseStudy.role },
    { label: "Technical Challenges", value: caseStudy.technicalChallenges },
    { label: "Design Decisions", value: caseStudy.designDecisions },
    { label: "Final Result", value: caseStudy.finalResult },
  ];

  return (
    <div className="case-study">
      {caseStudy.overview && (
        <section className="case-study__block">
          <h3>Overview</h3>
          <p>{caseStudy.overview}</p>
        </section>
      )}

      {caseStudy.role && (
        <section className="case-study__block">
          <h3>My Role</h3>
          <p>{caseStudy.role}</p>
        </section>
      )}

      {caseStudy.keyFeatures && caseStudy.keyFeatures.length > 0 && (
        <section className="case-study__block">
          <h3>Key Features</h3>
          <ul>
            {caseStudy.keyFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
      )}

      {caseStudy.technicalChallenges && (
        <section className="case-study__block">
          <h3>Technical Challenges</h3>
          <p>{caseStudy.technicalChallenges}</p>
        </section>
      )}

      {caseStudy.designDecisions && (
        <section className="case-study__block">
          <h3>Design Decisions</h3>
          <p>{caseStudy.designDecisions}</p>
        </section>
      )}

      {caseStudy.finalResult && (
        <section className="case-study__block">
          <h3>Final Result</h3>
          <p>{caseStudy.finalResult}</p>
        </section>
      )}

      {textSections.every((s) => !s.value) &&
        (!caseStudy.keyFeatures || caseStudy.keyFeatures.length === 0) && (
          <p className="muted-text">Case study coming soon.</p>
        )}
    </div>
  );
}
