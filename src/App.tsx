import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";

// `base` from vite.config.ts is exposed as import.meta.env.BASE_URL.
// Pass it to the router so deep links work under a GitHub Pages subpath.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Reset scroll to the top on every route change. Without this, navigating from a
 * scrolled list into a project page (e.g. the tall Arcade Machine 3D reveal) would
 * keep the previous scroll offset and open the page part-way down the animation.
 * Hash links are resolved after the destination route renders so section navigation
 * also works when the visitor starts on an individual project page.
 */
function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  // Take control of scroll position once so the browser doesn't restore a mid-page offset.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
