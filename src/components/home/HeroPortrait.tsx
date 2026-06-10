import { profile } from "../../data/profile";
import { usePointerParallax } from "../../hooks/usePointerParallax";

const SRC = "/Profile.jpg";

/**
 * HeroPortrait — a layered, cinematic treatment of James's photo.
 *
 * The source image already has a shallow-depth-of-field (the subject is sharp, the
 * Catalyst building behind is bokeh-blurred). We lean into that to *approximate*
 * foreground/background separation without any ML cutout:
 *
 *   · __bg    — an enlarged, extra-blurred, darkened, violet-tinted duplicate that
 *               bleeds past the frame and is radially masked so the photo's own
 *               background melts into the cosmos canvas behind the hero.
 *   · __glow  — a soft violet key-light bloom (the one accent = light) that breathes.
 *   · __frame — the sharp portrait, radially masked into the void (no hard rectangle)
 *               so the subject reads as the emphasised foreground element.
 *   · __sheen — a faint top-down light + hairline edge for a glassy, premium finish.
 *
 * Depth: the bg and frame translate by different amounts under pointer parallax
 * (see usePointerParallax) — disabled for reduced-motion and touch/coarse pointers.
 */
export default function HeroPortrait() {
  const ref = usePointerParallax<HTMLDivElement>(1);

  return (
    <div className="portrait" ref={ref}>
      <div
        className="portrait__bg"
        style={{ backgroundImage: `url(${SRC})` }}
        aria-hidden="true"
      />
      <div className="portrait__glow" aria-hidden="true" />
      <div className="portrait__frame">
        <img
          className="portrait__img"
          src={SRC}
          alt={`${profile.name}, ${profile.role}`}
          width={1567}
          height={2048}
          loading="eager"
          decoding="async"
        />
        <span className="portrait__sheen" aria-hidden="true" />
      </div>
    </div>
  );
}
