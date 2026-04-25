// @ozzylabs/preset-cli — OzzyLabs Node.js CLI preset for create-agentic-app.
//
// Initial scaffold (v0.0.0): the preset shape is established but the actual
// `files` and `merge` content is intentionally empty. Subsequent PRs will
// populate the tsdown / @clack/prompts / vitest / CLI package.json template
// described in handbook ADR-0017 § preset-cli.
//
// Consumers load this preset (and its required base) via:
//
//     // agentic-app.config.json
//     { "presets": ["@ozzylabs/preset-base", "@ozzylabs/preset-cli"] }

import type { Preset } from "@ozzylabs/preset-base";

const presetCli: Preset = {
  name: "cli",
  files: {},
  merge: {},
  requires: ["@ozzylabs/preset-base"],
};

export default presetCli;
