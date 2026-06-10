// Site-wide profile content. Keeps copy out of components.
// All values are placeholders pending James input (Milestone 5 — Content Pass).
// See ObsidianVault/09_Assets/CV And Contact Assets.md

export interface ContactLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  skills: string[];
  tools: string[];
  email?: string;
  /** Path to a CV file (e.g. "/cv.pdf" placed in /public). Optional until provided. */
  cvUrl?: string;
  links: ContactLink[];
}

export const profile: Profile = {
  name: "James Seymour",
  role: "Game Programmer & Designer",
  tagline: "Placeholder tagline — gameplay, engine, and systems programming. (TODO: James)",
  bio:
    "Placeholder bio. James Seymour is a game programmer and designer working across C++, " +
    "C#, and level design. (TODO: replace with real bio.)",
  skills: ["C++", "C#", "Gameplay Programming", "Engine / Systems", "Level Design", "Networking"],
  tools: ["Unity", "Source / Hammer", "Epic Online Services", "Git"],
  email: undefined, // TODO: add public contact email
  cvUrl: undefined, // TODO: add CV file to /public and set its path
  links: [
    // TODO: replace with real profiles
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "itch.io", href: "#" },
  ],
};
