import type { ReactNode } from "react";
import { profile } from "../../data/profile";
import type { SocialIcon } from "../../data/profile";

/**
 * SocialLinks — renders James's real profile links (GitHub, LinkedIn, itch.io)
 * from the single source of truth in src/data/profile.ts. Used in the hero,
 * contact section, and footer so the URLs are never hardcoded per-component.
 *
 * Every link opens safely in a new tab (target="_blank" + rel="noopener noreferrer")
 * and carries an explicit accessible label ("… opens in a new tab").
 */

// Inline, currentColor SVGs — no icon dependency, tint with CSS. 24x24 viewBox.
const ICONS: Record<SocialIcon, ReactNode> = {
  github: (
    <path
      fill="currentColor"
      d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z"
    />
  ),
  itch: (
    <path
      fill="currentColor"
      d="M3.13 1.34C2.18 1.9.28 4.08.02 4.75v1.1c0 1.4 1.3 2.62 2.49 2.62 1.42 0 2.61-1.18 2.61-2.58 0 1.4 1.15 2.58 2.57 2.58s2.52-1.18 2.52-2.58c0 1.4 1.23 2.58 2.65 2.58h.05c1.42 0 2.65-1.18 2.65-2.58 0 1.4 1.1 2.58 2.52 2.58s2.57-1.18 2.57-2.58c0 1.4 1.19 2.58 2.61 2.58 1.19 0 2.49-1.22 2.49-2.62v-1.1c-.26-.67-2.16-2.85-3.11-3.41C19.16 1.2 16.5 1 12 1S4.84 1.2 3.13 1.34Zm6.4 6.32a3.07 3.07 0 0 1-.53.66c-.5.5-1.19.8-1.94.8-.76 0-1.45-.31-1.95-.8a3.2 3.2 0 0 1-.4-.49c-.36.5-.92.86-1.55.97-.27.05-.45.28-.42.66.13 2.02.5 5.8.5 5.8.05 1.04.36 2.45.84 3.3.66 1.18 1.62 1.95 3.07 2.2.5.1 1.97.18 3.38.18 1.4 0 2.87-.08 3.37-.17 1.45-.26 2.4-1.03 3.07-2.2.48-.86.79-2.27.84-3.31 0 0 .37-3.78.5-5.8.03-.38-.15-.61-.42-.66a2.05 2.05 0 0 1-1.55-.97 3.2 3.2 0 0 1-.4.49c-.5.49-1.19.8-1.95.8-.75 0-1.44-.3-1.94-.8a3.07 3.07 0 0 1-.53-.66 3.07 3.07 0 0 1-.53.66c-.5.5-1.19.8-1.94.8h-.04c-.75 0-1.44-.3-1.94-.8a3.07 3.07 0 0 1-.53-.66Zm-.65 2.55h.01c.43 0 .81 0 1.28.51.37-.04.76-.06 1.16-.06h.78c.4 0 .79.02 1.16.06.47-.51.85-.51 1.28-.51h.01c.45 0 1.13 0 1.6 1.06.42.93 1.4 4.18.27 5.34-.5.51-1.32.77-2.2.84a4.4 4.4 0 0 1-2.91-.94 4.4 4.4 0 0 1-2.9.94c-.88-.07-1.7-.33-2.2-.84-1.14-1.16-.16-4.41.26-5.34.47-1.06 1.15-1.06 1.6-1.06Zm2.84 1.78c-.6.02-1.27.74-1.23 1.3.04.4.46.4.92.4h.74c.46 0 .88 0 .92-.4.04-.56-.63-1.28-1.23-1.3h-.13Z"
    />
  ),
};

type Variant = "row" | "hero" | "footer";

interface SocialLinksProps {
  /** Visual treatment for the context the links sit in. */
  variant?: Variant;
  className?: string;
}

export default function SocialLinks({ variant = "row", className }: SocialLinksProps) {
  const classes = ["social", `social--${variant}`, className].filter(Boolean).join(" ");

  return (
    <nav className={classes} aria-label="Social profiles">
      {profile.links.map((link) => (
        <a
          key={link.label}
          className="social__link"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.label} (opens in a new tab)`}
        >
          {link.icon && (
            <span className="social__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
                {ICONS[link.icon]}
              </svg>
            </span>
          )}
          <span className="social__label">{link.label}</span>
        </a>
      ))}
    </nav>
  );
}
