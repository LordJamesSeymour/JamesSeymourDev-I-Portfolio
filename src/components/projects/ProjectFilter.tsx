import type { ProjectCategory } from "../../types/project";

export type CategoryFilter = ProjectCategory | "All";

interface ProjectFilterProps {
  categories: ProjectCategory[];
  active: CategoryFilter;
  onChange: (next: CategoryFilter) => void;
}

export default function ProjectFilter({ categories, active, onChange }: ProjectFilterProps) {
  const options: CategoryFilter[] = ["All", ...categories];

  return (
    <div className="filter" role="group" aria-label="Filter projects by category">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`filter__btn${active === option ? " filter__btn--active" : ""}`}
          aria-pressed={active === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
