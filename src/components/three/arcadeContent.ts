/**
 * Three-free content + constants for the Arcade Machine reveal.
 * ---------------------------------------------------------------------------
 * Kept separate from arcadeConfig.ts (which imports three) so the eagerly-loaded
 * section shell (<ArcadeMachineReveal/> + fallback) carries NONE of the three.js
 * bundle — that only arrives with the lazy <ArcadeMachineScene/>.
 */

/**
 * Served URL of the assembled cabinet GLB. Files in /public are served from the
 * site root, honouring Vite's `base` (so it also works on a GitHub Pages project
 * subpath). Resolves to "/models/arcade-machine/PiecedTogether.glb" when base="/".
 */
export const MODEL_URL = `${import.meta.env.BASE_URL}models/arcade-machine/PiecedTogether.glb`;

/** Scroll-stage callouts — each activates once progress passes its `at` threshold. */
export interface Callout {
  at: number;
  title: string;
  body: string;
}

export const CALLOUTS: Callout[] = [
  {
    at: 0.0,
    title: "C++ / SFML arcade hub",
    body: "A custom front-end written in C++ with SFML that boots straight into a library of my games.",
  },
  {
    at: 0.18,
    title: "Physical cabinet build",
    body: "A real arcade cabinet — chassis, lid and panels — designed, built and finished by hand.",
  },
  {
    at: 0.4,
    title: "Raspberry Pi deployment",
    body: "The whole hub runs on a Raspberry Pi mounted inside the cabinet, booting on power-up.",
  },
  {
    at: 0.62,
    title: "Controller & arcade input",
    body: "Arcade buttons, a coin panel and controller support wired into the input layer.",
  },
  {
    at: 0.82,
    title: "Games, menus & level tools",
    body: "Launches Surfers Quest and a Bomberman-style game, with custom menus and level tools.",
  },
];

/** Compact chip summary of what the project demonstrates (shown alongside the stage). */
export const CALLOUT_CHIPS: string[] = [
  "C++ / SFML arcade hub",
  "Raspberry Pi deployment",
  "Physical cabinet build",
  "Controller input support",
  "Surfers Quest",
  "Bomberman-style game",
  "Custom menus and level tools",
];

export const ARCADE_INSIDE_DESCRIPTION_FALLBACK =
  "A C++/SFML arcade hub built and deployed onto a hand-made cabinet running on a Raspberry Pi. Scroll to take the machine apart and see how the hardware, screen, controls, audio and internal layout come together.";
