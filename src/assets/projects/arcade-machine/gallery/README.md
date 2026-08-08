# Arcade Machine project gallery

Add gallery images to this folder using lowercase file extensions:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.avif`

Images are discovered automatically by Vite. Prefix filenames with two-digit numbers
to control their order, for example:

- `01-front-view.jpg`
- `02-side-view.jpg`
- `03-internal-electronics.jpg`

Adding an image is enough for it to appear. Its filename is converted into readable
default alternative text. To provide custom alternative text or an optional caption,
add an entry keyed by the exact filename in:

`src/components/projects/arcadeMachineGalleryData.ts`

Restart the development server after adding or removing images so Vite refreshes the
folder-discovery map. Production deployments require a new `npm run build`.
