import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { ProjectCover } from "../types/project";
import { getProjectBySlug } from "../lib/projects";
import { placeholderCaption } from "../lib/placeholder";
import { useProjectText } from "../content/content";
import ProjectMedia from "../components/projects/ProjectMedia";
import CursorProjectMedia from "../components/projects/CursorProjectMedia";
import ProjectCaseStudy from "../components/projects/ProjectCaseStudy";
import ProjectLogo from "../components/projects/ProjectLogo";
import YouTubeEmbed from "../components/projects/YouTubeEmbed";
import YouTubeCarousel from "../components/projects/YouTubeCarousel";
import PlayableDemo from "../components/projects/PlayableDemo";
import SurfersQuestSpriteShowcase from "../components/projects/SurfersQuestSpriteShowcase";
import SuperBombermanSpriteShowcase from "../components/projects/SuperBombermanSpriteShowcase";
import ArcadeMachineReveal from "../components/three/ArcadeMachineReveal";
import SplitFlapAsciiBackground from "../components/backgrounds/SplitFlapAsciiBackground";
import CursorVaporwaveBackground from "../components/backgrounds/CursorVaporwaveBackground";
import CursorProjectDecorations from "../components/projects/CursorProjectDecorations";
import Tag from "../components/ui/Tag";
import Button from "../components/ui/Button";

const BASILISK_ASCII_URL = `${import.meta.env.BASE_URL}Basilisk/basilisk-ascii.txt`;
const SURFERS_QUEST_DEMO_URL =
  `${import.meta.env.BASE_URL}demos/surfers-quest/embed.html`;
const SURFERS_QUEST_MUTE_KEY = "surfers-quest-demo-muted";
const BOMBERMAN_DEMO_URL =
  `${import.meta.env.BASE_URL}demos/bomberman/embed.html`;

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const demoFrameRef = useRef<HTMLIFrameElement>(null);
  const demoContainerRef = useRef<HTMLDivElement>(null);
  const [isMapResetReady, setIsMapResetReady] = useState(false);
  const [isDemoMuted, setIsDemoMuted] = useState(() => {
    try {
      return window.localStorage.getItem(SURFERS_QUEST_MUTE_KEY) === "true";
    } catch {
      return false;
    }
  });

  // Editable copy (hooks run unconditionally — before any early return). Fallbacks
  // come from projects.ts; for an unknown slug these just resolve to the fallbacks.
  const safeSlug = slug ?? "";
  const title = useProjectText(safeSlug, "title", project?.name ?? "Project");
  const shortDesc = useProjectText(
    safeSlug,
    "short-description",
    project?.shortDescription ?? "",
  );
  const longDesc = useProjectText(
    safeSlug,
    "long-description",
    project?.caseStudy?.overview ?? "",
  );
  const creativeProcess = useProjectText(
    safeSlug,
    "creative-process",
    project?.caseStudy?.creativeProcess ?? "",
  );
  const role = useProjectText(safeSlug, "role", project?.caseStudy?.role ?? "");
  const contributions = useProjectText(
    safeSlug,
    "contributions",
    project?.caseStudy?.contributions ?? "",
  );
  const technicalHighlights = useProjectText(
    safeSlug,
    "technical-highlights",
    project?.caseStudy?.technicalHighlights ?? "",
  );
  const developmentContext = useProjectText(
    safeSlug,
    "development-context",
    project?.caseStudy?.developmentContext ?? "",
  );

  useEffect(() => {
    const handleDemoMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== demoFrameRef.current?.contentWindow ||
        event.data?.type !== "surfers-quest:reset-ready"
      ) {
        return;
      }

      setIsMapResetReady(event.data.ready === true);
    };

    window.addEventListener("message", handleDemoMessage);
    return () => window.removeEventListener("message", handleDemoMessage);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        SURFERS_QUEST_MUTE_KEY,
        String(isDemoMuted),
      );
    } catch {
      // Muting still works when browser storage is unavailable.
    }

    demoFrameRef.current?.contentWindow?.postMessage(
      {
        type: "SURFERS_QUEST_AUDIO_MUTE",
        muted: isDemoMuted,
      },
      window.location.origin,
    );
  }, [isDemoMuted]);

  if (!project) {
    return (
      <div className="container section">
        <h1>Project not found</h1>
        <p className="muted-text">No project matches “{slug}”.</p>
        <Button to="/projects" variant="ghost">
          Back to projects
        </Button>
      </div>
    );
  }

  // Hero cover: prefer an explicit cover, else the first media item, else a thumbnail.
  // ProjectMedia handles the on-brand placeholder when none of these exist.
  const heroCover: ProjectCover | undefined =
    project.cover ??
    project.media?.[0] ??
    (project.thumbnail ? { type: "image", src: project.thumbnail } : undefined);
  const caption = placeholderCaption(project.immersive?.showcaseType);

  // Editable text files supply the case-study prose while structural metadata stays
  // in projects.ts. Each field falls back to projects.ts (the fetch fallback), so an
  // empty/missing .txt keeps the data-driven value rather than blanking the section.
  const editableCaseStudy = {
    overview: longDesc || undefined,
    role: role || undefined,
    contributions: contributions || undefined,
    creativeProcess: creativeProcess || undefined,
    technicalHighlights: technicalHighlights || undefined,
    developmentContext: developmentContext || undefined,
  };
  const caseStudy = Object.values(editableCaseStudy).some(Boolean)
    ? { ...(project.caseStudy ?? {}), ...editableCaseStudy }
    : project.caseStudy;

  const { links } = project;
  const hasLinks = links && Object.values(links).some(Boolean);

  // Projects flagged as an exploded-view showcase (the Arcade Machine) get the
  // scroll-driven 3D reveal as their hero, in place of the static media panel.
  const showReveal = project.immersive?.revealType === "exploded-view";
  const showBasiliskBackground = project.slug === "basilisk-engine";
  // Cursor.zip opts into its bespoke vaporwave background via the data `theme`
  // field (kept off slug strings so new themed pages are a one-line data change).
  const showVaporwaveBackground = project.theme === "vaporwave";
  const showSurfersQuestDemo = project.slug === "surfers-quest";
  const showBombermanDemo = project.slug === "bomberman-style-game";

  const handleDemoFullscreen = () => {
    const demoContainer = demoContainerRef.current;
    if (!demoContainer) return;

    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
      return;
    }

    void demoContainer.requestFullscreen().catch(() => undefined);
  };

  const handleResetBrowserMaps = () => {
    if (!isMapResetReady || !demoFrameRef.current?.contentWindow) return;

    const confirmed = window.confirm(
      "Delete all Surfers Quest maps saved in this browser and restore the defaults?",
    );
    if (!confirmed) return;

    demoFrameRef.current.contentWindow.postMessage(
      { type: "surfers-quest:reset-maps" },
      window.location.origin,
    );
  };

  const handleDemoMuteToggle = () => {
    setIsDemoMuted((muted) => !muted);
  };

  const breadcrumb = (
    <p className="breadcrumb">
      <Link to="/projects">← Projects</Link>
    </p>
  );

  const header = (
    <header className="project-detail__header">
      {project.logo && <ProjectLogo logo={project.logo} />}
      <div className="project-detail__heading">
        <h1>{title}</h1>
        <Tag emphasis>{project.category}</Tag>
      </div>
      <p className="prose">{shortDesc}</p>
      <div className="tag-row">
        {project.technologies.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>
    </header>
  );

  const linksBlock = hasLinks ? (
    <div className="project-detail__links">
      {links?.github && (
        <Button href={links.github} variant="ghost">
          GitHub
        </Button>
      )}
      {links?.demo && (
        <Button href={links.demo} variant="ghost">
          Live Demo
        </Button>
      )}
      {links?.video && (
        <Button href={links.video} variant="ghost">
          Video
        </Button>
      )}
      {links?.download && (
        <Button href={links.download} variant="ghost">
          Download
        </Button>
      )}
    </div>
  ) : null;

  const showcaseVideosBlock =
    project.showcaseVideos && project.showcaseVideos.length > 0 ? (
      <section className="project-detail__showcase">
        <div className="project-detail__showcase-head">
          <h2>{project.showcaseVideos[0].heading}</h2>
        </div>
        <YouTubeCarousel videos={project.showcaseVideos} label={title} />
      </section>
    ) : null;
  const showcaseVideosAfterOverview =
    project.showcaseVideosPlacement === "after-overview";

  // Exploded-view showcase: title/summary, then the full-width 3D reveal as the
  // hero, then links + the case-study text. The reveal sits OUTSIDE the centered
  // article so its sticky scroll stage can span the full width (and so no
  // `overflow`-setting ancestor breaks position: sticky).
  if (showReveal) {
    return (
      <>
        <article className="container section project-detail project-detail--lead">
          {breadcrumb}
          {header}
        </article>

        <ArcadeMachineReveal />

        <article className="container section project-detail project-detail--study">
          {linksBlock}
          <ProjectCaseStudy caseStudy={caseStudy} />
        </article>
      </>
    );
  }

  return (
    <>
      {showBasiliskBackground && (
          <SplitFlapAsciiBackground
            asciiUrl={BASILISK_ASCII_URL}
            duration={4600}
          />
      )}

      {showVaporwaveBackground && <CursorVaporwaveBackground />}

      <article
        className={`container section project-detail${
          showBasiliskBackground ? " project-detail--basilisk" : ""
        }${showVaporwaveBackground ? " project-detail--vaporwave" : ""}`}
      >
        {showVaporwaveBackground && <CursorProjectDecorations />}
        {breadcrumb}
        {header}

        {showSurfersQuestDemo ? (
          <SurfersQuestSpriteShowcase
            preview={
              <ProjectMedia
                cover={heroCover}
                label={title}
                caption={caption}
              />
            }
          >
            <section
              className="project-detail__media-section project-demo"
              aria-labelledby="surfers-demo-heading"
            >
              <div className="project-detail__showcase-head">
                <h2 id="surfers-demo-heading">Playable Web Demo</h2>
              </div>
              <div
                ref={demoContainerRef}
                className="project-detail__media project-detail__media--demo"
              >
                <iframe
                  ref={demoFrameRef}
                  src={SURFERS_QUEST_DEMO_URL}
                  title="Surfers Quest playable demo"
                  className="project-demo__iframe"
                  allow="fullscreen; gamepad"
                  allowFullScreen
                  onLoad={() => {
                    setIsMapResetReady(false);
                    demoFrameRef.current?.contentWindow?.postMessage(
                      { type: "surfers-quest:query-reset-ready" },
                      window.location.origin,
                    );
                    demoFrameRef.current?.contentWindow?.postMessage(
                      {
                        type: "SURFERS_QUEST_AUDIO_MUTE",
                        muted: isDemoMuted,
                      },
                      window.location.origin,
                    );
                  }}
                />
                <button
                  type="button"
                  className={`project-demo__mute${
                    isDemoMuted ? " project-demo__mute--active" : ""
                  }`}
                  aria-label={
                    isDemoMuted
                      ? "Unmute Surfers Quest demo"
                      : "Mute Surfers Quest demo"
                  }
                  aria-pressed={isDemoMuted}
                  title={
                    isDemoMuted
                      ? "Unmute Surfers Quest demo"
                      : "Mute Surfers Quest demo"
                  }
                  onClick={handleDemoMuteToggle}
                >
                  <span>{isDemoMuted ? "Muted" : "Sound On"}</span>
                </button>
              </div>

              <div className="project-demo__actions">
                <div className="project-demo__buttons">
                  <button
                    type="button"
                    className="project-demo__action"
                    onClick={handleDemoFullscreen}
                  >
                    Fullscreen
                  </button>
                  <button
                    type="button"
                    className="project-demo__action"
                    onClick={handleResetBrowserMaps}
                    disabled={!isMapResetReady}
                  >
                    Reset browser maps
                  </button>
                </div>
                <p className="project-demo__hint">
                  Click the game first to capture keyboard.
                </p>
              </div>

              <div className="project-demo__controls">
                <section
                  className="project-demo__control-card"
                  aria-labelledby="surfers-play-controls"
                >
                  <h3 id="surfers-play-controls">Controls — Play</h3>
                  <dl className="project-demo__key-list">
                    <div>
                      <dt><kbd>A</kbd> / <kbd>D</kbd> or <kbd>←</kbd> / <kbd>→</kbd></dt>
                      <dd>Move</dd>
                    </div>
                    <div>
                      <dt><kbd>Space</kbd></dt>
                      <dd>
                        Jump (press again mid-air = double jump; jump into a
                        wall = wall jump)
                      </dd>
                    </div>
                    <div>
                      <dt><kbd>E</kbd> / <kbd>Shift</kbd></dt>
                      <dd>Drop through one-way platforms</dd>
                    </div>
                    <div>
                      <dt><kbd>R</kbd></dt>
                      <dd>Restart current level</dd>
                    </div>
                    <div>
                      <dt><kbd>Esc</kbd></dt>
                      <dd>Back to level select / menu</dd>
                    </div>
                    <div>
                      <dt><kbd>Enter</kbd> / <kbd>Space</kbd></dt>
                      <dd>Menu confirm · Level complete: continue</dd>
                    </div>
                  </dl>
                </section>

                <section
                  className="project-demo__control-card"
                  aria-labelledby="surfers-editor-controls"
                >
                  <h3 id="surfers-editor-controls">Controls — Level Editor</h3>
                  <dl className="project-demo__key-list">
                    <div>
                      <dt><kbd>Left-click</kbd></dt>
                      <dd>Paint tile / place object</dd>
                    </div>
                    <div>
                      <dt><kbd>Right-click</kbd></dt>
                      <dd>Erase</dd>
                    </div>
                    <div>
                      <dt><kbd>Middle-click</kbd></dt>
                      <dd>Pick tile under cursor</dd>
                    </div>
                    <div>
                      <dt><kbd>Scroll</kbd></dt>
                      <dd>Cycle the hotbar</dd>
                    </div>
                    <div>
                      <dt><kbd>F5</kbd></dt>
                      <dd>Save map (to this browser)</dd>
                    </div>
                    <div>
                      <dt><kbd>Esc</kbd></dt>
                      <dd>Cancel selection / leave editor</dd>
                    </div>
                  </dl>
                  <p className="project-demo__storage-note">
                    Maps you save are stored in <strong>this browser only</strong>{" "}
                    (IndexedDB) — they are not uploaded or shared. Use Reset
                    browser maps to restore the shipped defaults.
                  </p>
                </section>
              </div>
            </section>
          </SurfersQuestSpriteShowcase>
        ) : showBombermanDemo ? (
          <SuperBombermanSpriteShowcase
            preview={
              <ProjectMedia
                cover={heroCover}
                label={title}
                caption={caption}
              />
            }
          >
            <PlayableDemo
              demoUrl={BOMBERMAN_DEMO_URL}
              title="Bomberman"
              heading="Play the Bomberman Demo"
              muteMessageType="BOMBERMAN_AUDIO_MUTE"
              messagePrefix="bomberman"
              muteStorageKey="bomberman-demo-muted"
              resetConfirmText="Delete all Bomberman maps saved in this browser and restore the defaults?"
            >
              <section
                className="project-demo__control-card"
                aria-labelledby="bomberman-play-controls"
              >
                <h3 id="bomberman-play-controls">Controls — Play</h3>
                <dl className="project-demo__key-list">
                  <div>
                    <dt><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> or <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd></dt>
                    <dd>Move</dd>
                  </div>
                  <div>
                    <dt><kbd>Space</kbd></dt>
                    <dd>Place bomb</dd>
                  </div>
                  <div>
                    <dt><kbd>E</kbd> / <kbd>Shift</kbd></dt>
                    <dd>Punch / kick bomb</dd>
                  </div>
                  <div>
                    <dt><kbd>R</kbd></dt>
                    <dd>Restart level</dd>
                  </div>
                  <div>
                    <dt><kbd>Esc</kbd></dt>
                    <dd>Back to level select / menu</dd>
                  </div>
                  <div>
                    <dt><kbd>Enter</kbd> / <kbd>Space</kbd></dt>
                    <dd>Menu confirm</dd>
                  </div>
                </dl>
              </section>

              <section
                className="project-demo__control-card"
                aria-labelledby="bomberman-editor-controls"
              >
                <h3 id="bomberman-editor-controls">Controls — Level Editor</h3>
                <dl className="project-demo__key-list">
                  <div>
                    <dt><kbd>Left-click</kbd></dt>
                    <dd>Paint tile / place object</dd>
                  </div>
                  <div>
                    <dt><kbd>Right-click</kbd></dt>
                    <dd>Erase</dd>
                  </div>
                  <div>
                    <dt><kbd>Middle-click</kbd></dt>
                    <dd>Pick tile under cursor</dd>
                  </div>
                  <div>
                    <dt><kbd>Scroll</kbd></dt>
                    <dd>Cycle the hotbar</dd>
                  </div>
                  <div>
                    <dt><kbd>F5</kbd></dt>
                    <dd>Save map (to this browser)</dd>
                  </div>
                  <div>
                    <dt><kbd>Esc</kbd></dt>
                    <dd>Leave editor</dd>
                  </div>
                </dl>
                <p className="project-demo__storage-note">
                  Maps you save are stored in <strong>this browser only</strong>{" "}
                  (IndexedDB) — they are not uploaded or shared. Use Reset browser
                  maps to restore the shipped defaults.
                </p>
              </section>
            </PlayableDemo>
          </SuperBombermanSpriteShowcase>
        ) : (
          <div className="project-detail__media">
            {showVaporwaveBackground ? (
              <CursorProjectMedia cover={heroCover} label={title} caption={caption} />
            ) : (
              <ProjectMedia cover={heroCover} label={title} caption={caption} />
            )}
          </div>
        )}

        {project.showcaseVideo && (
          <section className="project-detail__showcase">
            <div className="project-detail__showcase-head">
              <h2>{project.showcaseVideo.heading}</h2>
              <a
                href={project.showcaseVideo.externalUrl}
                target="_blank"
                rel="noreferrer"
              >
                Watch on YouTube <span aria-hidden="true">↗</span>
              </a>
            </div>
            <YouTubeEmbed video={project.showcaseVideo} />
          </section>
        )}

        {!showcaseVideosAfterOverview && showcaseVideosBlock}

        {linksBlock}

        <ProjectCaseStudy
          caseStudy={caseStudy}
          afterOverview={
            showcaseVideosAfterOverview ? showcaseVideosBlock : undefined
          }
        />
      </article>
    </>
  );
}
