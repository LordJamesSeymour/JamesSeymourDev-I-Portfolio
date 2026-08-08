import type { Project } from "../types/project";

// Single source of truth for portfolio projects.
// Adding a project = adding an entry here. Pages/components render from this array.
//
// Status values are public-facing delivery states. Descriptions, media, and links
// continue to be managed independently during the Content Pass (Milestone 5).
// Per-project context lives in ObsidianVault/04_Project_Content/Projects/.
//
// COVERS: each project's card + detail hero is a `cover`, which can be a looping muted
// VIDEO, an animated GIF, or a static image. Most covers are still omitted, so the app
// falls back to generated placeholders (src/lib/placeholder.ts) — never reference a
// missing file. Cursor.zip, Arcade Machine, Surfers Quest, the Bomberman-style project,
// Basilisk Engine, and EOS Dedicated Server now wire real video covers through the same
// shared system (Basilisk adds a single YouTube showcase; EOS a two-video carousel).
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
      "Arcade Machine is a hand-built C++/SFML arcade cabinet project that combines custom game development, physical fabrication, Raspberry Pi deployment, controller integration, audio, and a polished portfolio-ready presentation. The machine runs a small arcade hub with playable games, menus, level selection, level editors, controller support, music, sound effects, and a custom cabinet designed around a 7-inch display.",
    technologies: ["C++"],
    featured: true,
    featuredPriority: 5,
    status: "in-progress",
    priority: "high",
    cover: {
      type: "video",
      src: "/ArcadeMachine/Videos/ArcadeShort.mp4",
      sources: ["/ArcadeMachine/Videos/ArcadeShort.mp4"],
      alt: "Arcade Machine gameplay preview",
    },
    logo: {
      src: "/ArcadeMachine/arcade-logo.png",
      alt: "Arcade Machine project logo",
    },
    // First real immersive asset: the assembled cabinet GLB drives the
    // scroll-driven exploded-view showcase (<ArcadeMachineReveal/>).
    immersive: {
      showcaseType: "model",
      model: "/models/arcade-machine/PiecedTogether.glb",
      revealType: "exploded-view",
    },
    missingAssets: [
      "Cabinet photo (the physical machine)",
      "Menu navigation video",
      "Short feature showcase clip",
    ],
    links: {},
    caseStudy: {
      overview:
        "Arcade Machine began as a software project and grew into a full physical build. The final system combines a Raspberry Pi, a 7-inch display, USB controllers, external audio, custom power routing and a 3D-printed cabinet into a portable arcade unit. The software includes an arcade hub, playable games, level selection, in-game audio, controller mapping, and editor tools for creating new levels.",
      creativeProcess:
        "The build required research across both software and hardware. I compared display options, controller layouts, Raspberry Pi requirements, power sources, USB hubs, audio speakers, cable types and port clearances before committing to the final layout. I learned to modify and adapt cabinet meshes in Tinkercad, printed and tested physical parts, designed screen brackets, adjusted clearances, routed cables, solved power delivery issues, and ported the C++/SFML project from desktop development to Raspberry Pi. A large part of the process was iterative: testing physical tolerances, improving cable management, checking controller behaviour, tuning audio output and making the machine reliable enough to be shown at events.",
    },
  },
  {
    slug: "surfers-quest",
    name: "Surfers Quest",
    category: "C++",
    shortDescription:
      "Surfers Quest is a C++/SFML side-scrolling platformer built for the Arcade Machine project. It focuses on responsive movement, animated 2D characters, layered tile-based levels, hazards, enemies, surface-aware audio, and a custom level editor designed for quick iteration.",
    technologies: ["C++"],
    featured: true,
    featuredPriority: 6,
    status: "completed",
    priority: "medium",
    cover: {
      type: "video",
      src: "/SurfersQuest/Videos/surfers-short.mp4",
      sources: ["/SurfersQuest/Videos/surfers-short.mp4"],
      alt: "Surfers Quest gameplay preview",
    },
    logo: {
      src: "/SurfersQuest/surfers-logo.png",
      alt: "Surfers Quest project logo",
    },
    immersive: { showcaseType: "video-screen" },
    missingAssets: [
      "Gameplay screenshots",
      "Level editor screenshot (if available)",
      "Player movement clip",
    ],
    links: {},
    caseStudy: {
      overview:
        "Surfers Quest is a platform game built around movement feel and level readability. The player can run, jump, double jump, wall grab, wall jump, drop through one-way platforms, avoid spike traps and interact with enemies across scrolling tile-based stages. The project uses SFML for rendering, input and audio, with a custom level format that supports world metadata, player spawns, enemies, terrain types, hazards and platform tiles.",
      creativeProcess:
        "The creative process focused on translating familiar platformer ideas into a responsive custom implementation. I researched common platforming techniques such as coyote time, jump buffering, variable jump height, wall interaction and enemy behaviour, then tuned them through repeated testing. One of the biggest challenges was making movement feel forgiving without losing precision, especially when combining double jumps, wall grabs, drop-through platforms and hazards. I also built a custom level editor shared in concept with the maze-action project, allowing levels to be painted with tile tools, saved, loaded and previewed quickly. This made it much faster to test layouts, enemy placement, world themes and difficulty progression.",
    },
  },
  {
    // ⚠ Trademark: pick an original public-facing name and use non-copyrighted art.
    slug: "bomberman-style-game",
    name: "Bomberman-style Game (placeholder name)",
    category: "C++",
    shortDescription:
      "A C++/SFML maze-action game built for the Arcade Machine project, featuring grid-based movement, bombs, chain explosions, enemies, power-ups, hidden exits, level progression, audio, controller support and a custom editor for building playable stages.",
    technologies: ["C++"],
    featured: false, // not in the featured 6 (kept in the full C++ list)
    status: "completed",
    priority: "medium",
    cover: {
      type: "video",
      src: "/SuperBomberman/Videos/bomberman-short.mp4",
      sources: ["/SuperBomberman/Videos/bomberman-short.mp4"],
      alt: "Bomberman-style game gameplay preview",
    },
    logo: {
      src: "/SuperBomberman/bomberman-logo.png",
      alt: "Bomberman-style game project logo",
    },
    showcaseVideos: [
      {
        youtubeId: "l2EcKWQ__p8",
        externalUrl: "https://youtu.be/l2EcKWQ__p8",
        title: "TRD",
        heading: "Project videos",
      },
      {
        youtubeId: "rJoKEOcevms",
        externalUrl: "https://youtu.be/rJoKEOcevms",
        title: "Project Description",
        heading: "Project videos",
      },
    ],
    showcaseVideosPlacement: "after-overview",
    immersive: { showcaseType: "video-screen" },
    missingAssets: [
      "Confirm the final public-facing project title",
      "Gameplay screenshot",
      "Level editor screenshot",
    ],
    links: {},
    caseStudy: {
      overview:
        "This project was created for my final university module, where the brief was to recreate the feel of a classic game while implementing my own systems and design choices. The result is a grid-based maze-action game with destructible blocks, bomb placement, explosion propagation, enemy behaviours, power-ups, hidden exits and multiple levels. It runs inside the Arcade Machine hub and is designed to work with both keyboard input and the arcade controller setup.",
      creativeProcess:
        "The project began with research into classic maze-action level structure, readable grid movement, timed hazards, enemy pressure and risk-reward design. The biggest technical challenges were building reliable tile collision, bomb timing, explosion spread, destructible blocks, enemy interactions, power-up progression and level transitions while keeping the game responsive on the Raspberry Pi build. I also developed a custom level editor, shared in concept with the Surfers Quest editor, so levels could be created, saved, loaded and tested without manually editing map files. The editor supports world selection, tile tools, enemy placement, player spawns, exits, breakable blocks and level file management, which made iteration much faster.",
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
    status: "completed",
    cover: {
      type: "video",
      src: "/EOS/Videos/eos-short.mp4",
      sources: ["/EOS/Videos/eos-short.mp4"],
      alt: "EOS Dedicated Server preview",
    },
    logo: {
      src: "/EOS/EOS-logo.png",
      alt: "EOS Dedicated Server project logo",
    },
    // Two hosted clips rendered as a switchable carousel (<YouTubeCarousel/>).
    showcaseVideos: [
      {
        youtubeId: "qfgG6GS0QKE",
        externalUrl: "https://www.youtube.com/watch?v=qfgG6GS0QKE",
        title: "EOS Dedicated Server showcase video 1",
        heading: "Server showcase",
      },
      {
        youtubeId: "EYpZmPbpHGE",
        externalUrl: "https://youtu.be/EYpZmPbpHGE",
        title: "EOS Dedicated Server showcase video 2",
        heading: "Server showcase",
      },
    ],
    priority: "high",
    immersive: { showcaseType: "floating-card" },
    missingAssets: [
      "Architecture diagram",
      "Server console screenshot",
      "Network / session flow diagram",
      "Short written explanation of functionality",
      "Technology stack details",
    ],
    links: {
      video: "https://www.youtube.com/watch?v=qfgG6GS0QKE",
    },
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
    status: "in-progress",
    cover: {
      type: "video",
      src: "/Basilisk/Videos/basilisk-short.mp4",
      sources: ["/Basilisk/Videos/basilisk-short.mp4"],
      alt: "Basilisk Engine preview",
    },
    logo: {
      src: "/Basilisk/basilisk-logo.png",
      alt: "Basilisk Engine project logo",
    },
    showcaseVideo: {
      youtubeId: "EFVWiAf81z0",
      externalUrl: "https://youtu.be/EFVWiAf81z0",
      title: "Basilisk Engine showcase",
      heading: "Engine showcase",
    },
    priority: "high",
    immersive: { showcaseType: "video-screen" },
    missingAssets: [
      "Editor screenshot",
      "Gizmo / inspector clip",
      "Scene hierarchy screenshot",
    ],
    links: {
      video: "https://youtu.be/EFVWiAf81z0",
    },
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
    // Project-specific vaporwave background (neon grid + retro sun + marble busts
    // + Win95 windows) rendered behind the case study. See CursorVaporwaveBackground.
    theme: "vaporwave",
    shortDescription:
      "Cursor.zip is a third-person 3D platformer built in Unity, where players use wallrunning, grappling and ball transformation to complete an early-internet-inspired track as quickly as possible. Its movement-focused structure rewards maintaining speed, linking abilities and improving each run.",
    technologies: ["Unity", "C#"],
    featured: true,
    featuredPriority: 4,
    status: "completed",
    cover: {
      type: "video",
      src: "/Cursor/Videos/cursor-short.mp4",
      sources: ["/Cursor/Videos/cursor-short.mp4"],
      poster: "/Cursor/Videos/cursor-short-poster.jpg",
      alt: "Cursor.zip gameplay preview",
    },
    logo: {
      src: "/Cursor/optimized/cursor-zip-logo-480.webp",
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
    missingAssets: ["Gameplay screenshots"],
    links: {
      video: "https://youtu.be/g4LTAYN-QgE",
    },
    // Prose fallbacks mirror public/content/projects/cursor-zip/*.txt (the live,
    // editable source). The .txt files win at runtime; these keep the page intact
    // if a fetch fails.
    caseStudy: {
      overview:
        "Developed over eight weeks for my final university module, Cursor.zip was created by a multidisciplinary team of 21 people, including five programmers. The game pairs high-speed third-person platforming with a 3D setting shaped by the visual style and culture of the early internet. Players navigate the track, link movement abilities and work towards faster completion times, with Haste and Clustertruck providing the main reference points for its pace and momentum.",
      role:
        "As Senior Programmer, I developed the complete character controller and the complete player movement system, including all major character mechanics. I also contributed substantially to the input system and provided technical oversight across the wider Unity project, helping ensure that the screen flow, core gameplay loop and connected systems worked together correctly. My remit centred on programming ownership and integration within the wider multidisciplinary team.",
      contributions:
        "My core contribution was end-to-end ownership of the character controller and movement code, including the wallrunning, grappling and ball-transformation mechanics used by the player. Beyond those systems, I made significant contributions to input and helped connect the screen flow and gameplay loop across the project. Throughout production, I supported the structure, reliability and overall quality of the codebase while overseeing how the major gameplay systems fitted together.",
      technicalHighlights:
        "To speed up level creation, I built a spline-based wallrunning system that allowed wallrun surfaces to be authored and adjusted during level design. I also developed an audio-reactive material system that responded dynamically to the music, reinforcing the game's early-internet-inspired visual identity.",
      developmentContext:
        "Cursor.zip was developed by Group 26 at the University of Staffordshire during an eight-week final-module production. The team comprised 21 people across multiple disciplines, including five programmers. The module was structured to develop collaboration, communication and other professional working practices by asking a comparatively large student team to build a complete game together. Working at that scale demonstrates my ability to take ownership of complex gameplay systems while contributing to a shared technical direction.",
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
    status: "in-progress",
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
      "An eight-week university level-design project for Team Fortress 2, built in Hammer Editor during the first module of my final year. This King of the Hill map supports 4v4 to 8v8 matches inside a space station on the Moon, where RED and BLU battle over a central rocket—their only route home.",
    technologies: ["Hammer Editor", "Source Engine"],
    featured: false, // intentionally excluded from Featured Projects; stays under Level Design
    status: "completed",
    thumbnail: "/Hammer/HammerMap.png",
    showcaseVideos: [
      {
        youtubeId: "TF4499mnCWE",
        externalUrl: "https://www.youtube.com/watch?v=TF4499mnCWE",
        title: "Hammer Moonbase Map flyby",
        heading: "Moonbase videos",
      },
      {
        youtubeId: "Vxw3PRF2Iw8",
        externalUrl: "https://youtu.be/Vxw3PRF2Iw8",
        title: "KOTH Moonbase map commentary",
        heading: "Moonbase videos",
      },
    ],
    priority: "medium",
    immersive: { showcaseType: "environment" },
    missingAssets: [
      "Hammer editor screenshot",
      "Top-down layout image",
    ],
    links: {
      video: "https://www.youtube.com/watch?v=TF4499mnCWE",
    },
    caseStudy: {
      overview:
        "The project explored how a compact competitive space could remain fair while carrying a clear narrative. Designed for 8 to 16 players, the map uses King of the Hill to concentrate both teams on a single control point built around the station’s central rocket. RED and BLU approach equivalent playable spaces within a symmetrical layout, supporting orientation and equal access to the objective. Around that shared geometry, team-specific architecture, props and environmental decoration distinguish the two halves and explain the conflict: both companies are stranded on the Moon and the rocket is their only means of returning home.",
      designDecisions:
        "King of the Hill suited the project because a single contested objective keeps attention on the story’s most important element: the rocket. Positioning the control point at the centre makes each team’s goal immediately legible and gives every match a clear focus. The intended 4v4 to 8v8 scale keeps encounters concentrated around that objective.\n\nThe layout is mirrored between RED and BLU so neither team gains a geometric advantage and players can understand the opposing half through what they learn on their own. The route plan uses matching tunnels, cover, stairs, elevated positions and flank hatches around the central arena; these elements remain equivalent even when their presentation changes.\n\nThe visual concept draws on the lunar-station setting of the Overwatch Moonbase map while translating it into Team Fortress 2’s stylised industrial world and RED-versus-BLU fiction. Distinct company decoration gives each half its own identity without changing the playable space. This set dressing also carries the narrative, framing the fight as a struggle between two stranded companies for the only rocket capable of taking them home.",
    },
  },
];
