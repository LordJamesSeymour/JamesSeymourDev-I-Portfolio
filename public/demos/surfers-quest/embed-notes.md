# Embedding the Surfers Quest demo

The demo is a fully static page under `public/demos/surfers-quest/`. Because
everything lives in `public/`, Vite serves it at the site root, so you can embed
it from any page with a plain `<iframe>`.

## Plain HTML / iframe

```html
<iframe
    src="/demos/surfers-quest/index.html"
    title="Surfers Quest — Web Demo"
    width="1024"
    height="760"
    style="border:0; border-radius:12px; max-width:100%;"
    allow="autoplay; fullscreen"
    loading="lazy">
</iframe>
```

> The iframe is a little taller than the 640px canvas so the controls panel
> below the game is visible. Drop the extra height if you only want the canvas.

## Responsive wrapper (keeps the 1024×640 game aspect)

```html
<div style="max-width:1024px; margin:0 auto;">
  <div style="position:relative; width:100%; aspect-ratio:1024/640;">
    <iframe
      src="/demos/surfers-quest/index.html"
      title="Surfers Quest — Web Demo"
      style="position:absolute; inset:0; width:100%; height:100%; border:0; border-radius:12px;"
      allow="autoplay; fullscreen"
      loading="lazy">
    </iframe>
  </div>
</div>
```

## React (Vite) component

```tsx
export function SurfersQuestDemo() {
  return (
    <div style={{ maxWidth: 1024, margin: "0 auto" }}>
      <iframe
        src="/demos/surfers-quest/index.html"
        title="Surfers Quest — Web Demo"
        style={{
          width: "100%",
          aspectRatio: "1024 / 760",
          border: 0,
          borderRadius: 12,
        }}
        allow="autoplay; fullscreen"
        loading="lazy"
      />
    </div>
  );
}
```

Use it on a project detail page:

```tsx
import { SurfersQuestDemo } from "./SurfersQuestDemo";

// ...
<section>
  <h2>Play it in your browser</h2>
  <SurfersQuestDemo />
</section>
```

## Notes

- Keep `allow="autoplay; fullscreen"` so the in-game audio gate and the
  Fullscreen button work inside the iframe.
- `loading="lazy"` avoids downloading the (large) `.wasm`/`.data` bundle until
  the iframe is near the viewport — good for a project page with the demo lower
  down.
- The demo captures the keyboard only while it has focus, so a user scrolling
  past it won't have their arrow keys/space hijacked until they click into it.
- If you serve the site under a sub-path, change `src` accordingly (the internal
  `surfers-quest.js/.wasm/.data` are referenced relatively, so they follow
  `index.html`).
