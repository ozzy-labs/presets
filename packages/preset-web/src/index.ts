// @ozzylabs/preset-web — OzzyLabs web preset for create-agentic-app.
//
// Initial scaffold (v0.0.0): the preset shape is established but the actual
// `files` and `merge` content is intentionally empty. Subsequent PRs will
// populate Astro / React / Tailwind / Vite configuration described in
// handbook ADR-0017 § preset-web.
//
// Consumers load this preset (and its required base) via:
//
//     // agentic-app.config.json
//     { "presets": ["@ozzylabs/preset-base", "@ozzylabs/preset-web"] }

import type { Preset } from "@ozzylabs/preset-base";

const presetWeb: Preset = {
  name: "web",
  files: {},
  merge: {},
  requires: ["@ozzylabs/preset-base"],
};

export default presetWeb;
