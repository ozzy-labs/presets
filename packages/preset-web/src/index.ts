// @ozzylabs/preset-web — OzzyLabs web preset for create-agentic-app.
//
// Bundles Astro + React + Tailwind CSS + Vite baseline configuration on top
// of `@ozzylabs/preset-base`. Loaded by CAA via the external preset loader:
//
//     // agentic-app.config.json
//     { "presets": ["@ozzylabs/preset-base", "@ozzylabs/preset-web"] }
//
// See handbook ADR-0017 § preset-web for the bundled inventory.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Preset } from "@ozzylabs/preset-base";

const here = dirname(fileURLToPath(import.meta.url));
const templatesDir = resolve(here, "../templates");

function read(name: string): string {
  return readFileSync(resolve(templatesDir, name), "utf8");
}

const presetWeb: Preset = {
  name: "web",
  requires: ["@ozzylabs/preset-base"],
  files: {
    // Framework
    "astro.config.mjs": read("astro.config.mjs"),

    // TS
    "tsconfig.json": read("tsconfig.json"),

    // Styling
    "src/styles/global.css": read("src/styles/global.css"),

    // Editor
    ".vscode/settings.json": read(".vscode/settings.json"),
  },
  merge: {
    "package.json": {
      type: "module",
      scripts: {
        dev: "astro dev",
        build: "astro build",
        preview: "astro preview",
        astro: "astro",
        typecheck: "astro check",
      },
      dependencies: {
        astro: "^5.0.0",
        react: "^19.0.0",
        "react-dom": "^19.0.0",
        "@astrojs/react": "^4.0.0",
        "@tailwindcss/vite": "^4.0.0",
        tailwindcss: "^4.0.0",
      },
      devDependencies: {
        "@types/react": "^19.0.0",
        "@types/react-dom": "^19.0.0",
      },
    },
    ".gitignore": ["dist/", ".astro/", "*.tsbuildinfo"],
  },
};

export default presetWeb;
