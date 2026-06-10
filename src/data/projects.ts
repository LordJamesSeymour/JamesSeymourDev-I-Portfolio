import type { Project } from "../types/project";

// Single source of truth for portfolio projects.
// Adding a project = adding an entry here. Pages/components render from this array.
//
// All entries are placeholders for now (status: "placeholder"). Real descriptions,
// media, and links come during the Content Pass (Milestone 5). Per-project context
// lives in ObsidianVault/04_Project_Content/Projects/.
//
// NOTE: thumbnails/media are intentionally omitted so the app falls back to generated
// placeholders (see src/lib/placeholder.ts) — never reference a missing file.

export const projects: Project[] = [
  // ---------------------------------------------------------------- C++
  {
    slug: "arcade-machine",
    name: "Arcade Machine",
    category: "C++",
    shortDescription:
      "Placeholder description — a C++ arcade machine project. (Final copy pending.)",
    technologies: ["C++"],
    featured: true,
    status: "placeholder",
    links: {},
    caseStudy: {
      overview: "TODO: What is the Arcade Machine project? Add a short overview.",
      role: "TODO: James's role.",
      keyFeatures: ["TODO: key feature"],
      technicalChallenges: "TODO: notable technical challenges.",
      designDecisions: "TODO: key design decisions.",
      finalResult: "TODO: outcome / final result.",
    },
  },
  {
    slug: "surfers-quest",
    name: "Surfers Quest",
    category: "C++",
    shortDescription:
      "Placeholder description — a C++ game, 'Surfers Quest'. (Final copy pending.)",
    technologies: ["C++"],
    status: "placeholder",
    links: {},
    caseStudy: {
      overview: "TODO: What is Surfers Quest? Add a short overview.",
    },
  },
  {
    // ⚠ Trademark: pick an original public-facing name and use non-copyrighted art.
    slug: "bomberman-style-game",
    name: "Bomberman-style Game (placeholder name)",
    category: "C++",
    shortDescription:
      "Placeholder description — a Bomberman-style C++ game. Final, original name TBD.",
    technologies: ["C++"],
    status: "placeholder",
    links: {},
    caseStudy: {
      overview:
        "TODO: Describe the game. NOTE: choose an original, non-trademarked public name.",
    },
  },
  {
    slug: "eos-dedicated-server",
    name: "EOS Dedicated Server",
    category: "C++",
    shortDescription:
      "Placeholder description — a dedicated server using Epic Online Services (EOS).",
    technologies: ["C++", "Epic Online Services"],
    featured: true,
    status: "placeholder",
    links: {},
    caseStudy: {
      overview: "TODO: Describe the EOS dedicated server / networking work.",
      keyFeatures: ["TODO: networking feature"],
      technicalChallenges: "TODO: networking / multiplayer challenges.",
    },
  },
  {
    slug: "basilisk-engine",
    name: "Basilisk Engine",
    category: "C++",
    shortDescription:
      "Placeholder description — a custom C++ game engine, 'Basilisk Engine'.",
    technologies: ["C++"],
    featured: true,
    status: "placeholder",
    links: {},
    caseStudy: {
      overview: "TODO: Describe the engine's scope and goals.",
      keyFeatures: ["TODO: engine subsystem"],
      technicalChallenges: "TODO: graphics / architecture challenges.",
      designDecisions: "TODO: architectural decisions.",
    },
  },

  // ---------------------------------------------------------------- C#
  {
    slug: "cursor-zip",
    name: "Cursor.zip",
    category: "C#",
    shortDescription: "Placeholder description — a C# project, 'Cursor.zip'.",
    technologies: ["C#"],
    status: "placeholder",
    links: {},
    caseStudy: {
      overview: "TODO: What is Cursor.zip? Add a short overview.",
    },
  },
  {
    slug: "zombies-vr",
    name: "Zombies VR",
    category: "C#",
    shortDescription:
      "Placeholder description — a VR zombies game built in C# (likely Unity + XR).",
    technologies: ["C#", "Unity", "VR"],
    featured: true,
    status: "placeholder",
    links: {},
    caseStudy: {
      overview: "TODO: Describe the VR game. Confirm engine + target headset.",
      keyFeatures: ["TODO: VR interaction feature"],
    },
  },

  // ---------------------------------------------------------- Level Design
  {
    slug: "hammer-moonbase-map",
    name: "Hammer Engine Moonbase Map",
    category: "Level Design",
    shortDescription:
      "Placeholder description — a moonbase map built in the Hammer (Source) editor.",
    technologies: ["Hammer Editor", "Source Engine"],
    status: "placeholder",
    links: {},
    caseStudy: {
      overview: "TODO: Describe the level. Confirm target game / Source branch.",
      designDecisions: "TODO: layout, flow, and pacing decisions.",
    },
  },
];
