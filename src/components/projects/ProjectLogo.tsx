import { useState } from "react";
import type { ProjectLogo as ProjectLogoData } from "../../types/project";
import { resolvePublicAssetPath } from "../../lib/assets";

interface ProjectLogoProps {
  logo: ProjectLogoData;
}

/** Optional project branding that disappears cleanly if its asset cannot load. */
export default function ProjectLogo({ logo }: ProjectLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="project-logo">
      <img
        src={resolvePublicAssetPath(logo.src)}
        alt={logo.alt}
        loading="eager"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
