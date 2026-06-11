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
  // Fallbacks only — the live copy is edited in public/content/site/*.txt
  // (hero-tagline.txt / about-body.txt). Kept in sync so a failed fetch still
  // shows real copy rather than a placeholder.
  tagline:
    "Building gameplay systems, engine tools and interactive experiences across " +
    "C++, C#, VR and level design.",
  bio:
    "I am a developer with a BSc (Hons) in Game Design and Programming from the " +
    "University of Staffordshire. My passion for development began through modding my " +
    "favourite games, which led me towards programming and building original projects " +
    "of my own. I work across C++, C#, VR, engine tools and level design, combining " +
    "technical problem-solving with creative design. I am fluent in both English and Spanish.",
  skills: ["C++", "C#", "Gameplay Programming", "Engine / Systems", "Level Design", "Networking"],
  tools: ["Unity", "Unreal Engine", "Source / Hammer", "Epic Online Services", "Git"],
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
