// @ozzylabs/preset-base — OzzyLabs base preset for create-agentic-app.
//
// Initial scaffold (v0.0.0): the preset shape is established but the actual
// `files` and `merge` content is intentionally empty. Subsequent PRs (handbook#57
// follow-ups) will populate the bundled tooling configuration described in
// handbook ADR-0017 § preset-base.
//
// Consumers load this preset via create-agentic-app's external preset loader:
//
//     // agentic-app.config.json
//     { "presets": ["@ozzylabs/preset-base"] }

import type { Preset } from "./types.js";

const presetBase: Preset = {
  name: "base",
  files: {},
  merge: {},
};

export default presetBase;
export type { Preset };
