import { useEffect, useState } from "react";

/**
 * Editable text content system.
 * ----------------------------------------------------------------------------
 * Visible copy lives in plain `.txt` files under `public/content/` so it can be edited
 * without touching React/TS. This hook fetches one file and returns its trimmed text,
 * with a hard-coded `fallback` used while loading, if the file is missing, or if the
 * fetch fails. So the page is always populated and never crashes on a missing file.
 *
 * See public/content/README.md and
 * ObsidianVault/02_Website_Architecture/Editable Text Content System.md.
 */

// Session cache so each file is fetched at most once (keyed by resolved path).
const cache = new Map<string, string>();

/** Build the served URL, honouring Vite's base (works on GitHub Pages project sites). */
function resolveUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

/** A missing static file is often served as the SPA index.html (200) — detect & reject. */
function looksLikeHtml(text: string): boolean {
  return /^\s*<(?:!doctype html|html|!--)/i.test(text);
}

export function useTextContent(path: string, fallback: string): string {
  const [text, setText] = useState<string>(() => cache.get(path) ?? fallback);

  useEffect(() => {
    if (cache.has(path)) {
      setText(cache.get(path)!);
      return;
    }
    let cancelled = false;
    fetch(resolveUrl(path), { headers: { Accept: "text/plain" } })
      .then(async (res) => {
        if (!res.ok) throw new Error(`status ${res.status}`);
        const raw = await res.text();
        if (looksLikeHtml(raw)) throw new Error("spa-fallback (file missing)");
        return raw.trim();
      })
      .then((value) => {
        if (cancelled || !value) return;
        cache.set(path, value);
        setText(value);
      })
      .catch(() => {
        // Keep the fallback — never crash on missing/failed content.
      });
    return () => {
      cancelled = true;
    };
  }, [path, fallback]);

  return text;
}
