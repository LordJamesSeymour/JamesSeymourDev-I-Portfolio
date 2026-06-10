// Site-wide profile content. Keeps copy out of components.
// All values are placeholders pending James input (Milestone 5 — Content Pass).
// See ObsidianVault/09_Assets/CV And Contact Assets.md

/** Icon id for a social/profile link; maps to an inline SVG in <SocialLinks/>. */
export type SocialIcon = "github" | "linkedin" | "itch";

export interface ContactLink {
  label: string;
  href: string;
  /** Optional icon id. When set, <SocialLinks/> renders the matching glyph. */
  icon?: SocialIcon;
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
  // Real profiles. Single source of truth — rendered by <SocialLinks/> in the
  // hero, contact section, and footer (so links live in one place, not per component).
  links: [
    { label: "GitHub", href: "https://github.com/LordJamesSeymour", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/james-seymour-0941a8188/",
      icon: "linkedin",
    },
    { label: "itch.io", href: "https://james-seymour.itch.io/", icon: "itch" },
  ],
};
