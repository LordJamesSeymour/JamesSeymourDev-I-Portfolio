import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// NOTE on `base`:
//   - Local dev + custom domain + user/org site (username.github.io): keep "/".
//   - GitHub Pages PROJECT site (username.github.io/<repo>): set base to "/<repo>/".
// See ObsidianVault/08_Deployment/GitHub Pages Deployment.md
export default defineConfig({
  base: "/",
  plugins: [react()],
});
