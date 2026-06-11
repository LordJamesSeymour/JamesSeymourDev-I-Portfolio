import type { Project } from "../types/project";

// Single source of truth for portfolio projects.
// Adding a project = adding an entry here. Pages/components render from this array.
//
// All entries are placeholders for now (status: "placeholder"). Real descriptions,
// media, and links come during the Content Pass (Milestone 5). Per-project context
// lives in ObsidianVault/04_Project_Content/Projects/.
//
// COVERS: each project's card + detail hero is a `cover`, which can be a looping muted
// VIDEO, an animated GIF, or a static image. Most covers are still omitted, so the app
// falls back to generated placeholders (src/lib/placeholder.ts) — never reference a
// missing file. Cursor.zip already wires a real video cover as a worked example.
//
// ASSET PLANNING: each entry also carries `priority`, `missingAssets`, and
// `immersive.showcaseType` (see src/types/project.ts). `missingAssets` drives a dev-only
// "James input needed" note on cards (hidden in production). Full per-project asset spec:
// ObsidianVault/09_Assets/Portfolio Asset Requirements Table.md.
//
// When real media exists, add a `cover` (and optionally a `media` gallery), e.g.:
//
//   cover: { type: "video", src: "/media/arcade-machine.mp4", poster: "/media/arcade-machine.jpg",
//            alt: "Arcade Machine gameplay loop" },
//   cover: { type: "gif",   src: "/media/surfers-quest.gif", alt: "Surfers Quest gameplay" },
//   cover: { type: "image", src: "/media/basilisk.webp",     alt: "Basilisk Engine editor" },
//
// Put files in /public (referenced as "/media/...") or import from src/assets.
// Always provide a `poster` for videos — it shows before load and for reduced-motion users.

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
    featuredPriority: 5,
    status: "placeholder",
    priority: "high",
    // First real immersive asset: the assembled cabinet GLB drives the
    // scroll-driven exploded-view showcase (<ArcadeMachineReveal/>).
    immersive: {
      showcaseType: "model",
      model: "/models/arcade-machine/PiecedTogether.glb",
      revealType: "exploded-view",
    },
    missingAssets: [
      "Cabinet photo (the physical machine)",
      "Gameplay video loop",
      "Menu navigation video",
      "Card thumbnail",
      "Short feature showcase clip",
    ],
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
    featured: true,
    featuredPriority: 6,
    status: "placeholder",
    priority: "medium",
    immersive: { showcaseType: "video-screen" },
    missingAssets: [
      "Gameplay screenshots",
      "Level editor screenshot (if available)",
      "Short gameplay video",
      "Player movement clip",
      "Card thumbnail",
    ],
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
    featured: false, // not in the featured 6 (kept in the full C++ list)
    status: "placeholder",
    priority: "medium",
    immersive: { showcaseType: "video-screen" },
    missingAssets: [
      "Decide a public-safe, original (non-trademarked) name",
      "Gameplay screenshot",
      "Bomb / explosion gameplay clip",
      "Level editor screenshot",
      "Card thumbnail",
    ],
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
    featuredPriority: 2,
    status: "placeholder",
    priority: "high",
    immersive: { showcaseType: "floating-card" },
    missingAssets: [
      "Architecture diagram",
      "Server console screenshot",
      "Network / session flow diagram",
      "Short written explanation of functionality",
      "Technology stack details",
    ],
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
    featuredPriority: 1,
    status: "placeholder",
    priority: "high",
    immersive: { showcaseType: "video-screen" },
    missingAssets: [
      "Editor screenshot",
      "Viewport interaction video",
      "Gizmo / inspector clip",
      "Scene hierarchy screenshot",
      "Optional engine logo / 3D mark",
    ],
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
    featured: true,
    featuredPriority: 4,
    status: "in-progress",
    cover: {
      type: "video",
      src: "/Cursor/Videos/cursor-short.mp4",
      sources: ["/Cursor/Videos/cursor-short.mp4"],
      poster: "/Cursor/Videos/cursor-short-poster.jpg",
      alt: "Cursor.zip gameplay preview",
    },
    logo: {
      src: "/Cursor/cursor-zip-logo.png",
      alt: "Cursor.zip project logo",
    },
    showcaseVideo: {
      youtubeId: "g4LTAYN-QgE",
      externalUrl: "https://youtu.be/g4LTAYN-QgE",
      title: "Cursor.zip gameplay trailer",
      heading: "Gameplay trailer",
    },
    priority: "medium",
    immersive: { showcaseType: "video-screen" },
    missingAssets: [
      "Clarify what Cursor.zip is (one-line definition)",
      "Decide final public-facing title",
      "Screenshots",
    ],
    links: {
      video: "https://youtu.be/g4LTAYN-QgE",
    },
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
    featuredPriority: 3,
    status: "placeholder",
    priority: "high",
    immersive: { showcaseType: "video-screen" },
    missingAssets: [
      "VR gameplay video",
      "Interaction / combat clip",
      "Screenshots",
      "Platform / headset information",
      "Card thumbnail",
    ],
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
    featured: false, // intentionally excluded from Featured Projects; stays under Level Design
    status: "in-progress",
    thumbnail: "/Hammer/HammerMap.png",
    showcaseVideo: {
      youtubeId: "TF4499mnCWE",
      externalUrl: "https://www.youtube.com/watch?v=TF4499mnCWE",
      title: "Hammer Moonbase Map flyby",
      heading: "Moonbase map flyby",
    },
    priority: "medium",
    immersive: { showcaseType: "environment" },
    missingAssets: [
      "Hammer editor screenshot",
      "Top-down layout image",
      "Written design explanation",
    ],
    links: {
      video: "https://www.youtube.com/watch?v=TF4499mnCWE",
    },
    caseStudy: {
      overview: "TODO: Describe the level. Confirm target game / Source branch.",
      designDecisions: "TODO: layout, flow, and pacing decisions.",
    },
  },
];
