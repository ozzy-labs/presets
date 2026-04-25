// @ozzylabs/preset-cli — OzzyLabs Node.js CLI preset for create-agentic-app.
//
// Bundles tsdown + @clack/prompts + vitest baseline for shipping a Node.js
// CLI on top of `@ozzylabs/preset-base`. Loaded by CAA via the external
// preset loader:
//
//     // agentic-app.config.json
//     { "presets": ["@ozzylabs/preset-base", "@ozzylabs/preset-cli"] }
//
// CAA distinguishes a CLI consumer from a library consumer by the presence
// of a `bin` entry in the merged package.json — this preset always merges
// one in via `merge["package.json"].bin`.
//
// See handbook ADR-0017 § preset-cli for the bundled inventory.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Preset } from "@ozzylabs/preset-base";

const here = dirname(fileURLToPath(import.meta.url));
const templatesDir = resolve(here, "../templates");

function read(name: string): string {
  return readFileSync(resolve(templatesDir, name), "utf8");
}

const presetCli: Preset = {
  name: "cli",
  requires: ["@ozzylabs/preset-base"],
  files: {
    // Build
    "tsdown.config.ts": read("tsdown.config.ts"),

    // TS
    "tsconfig.json": read("tsconfig.json"),

    // Test
    "vitest.config.ts": read("vitest.config.ts"),

    // Entry
    "src/cli.ts": read("src/cli.ts"),

    // Smoke test
    "tests/cli.test.ts": read("tests/cli.test.ts"),
  },
  merge: {
    "package.json": {
      type: "module",
      bin: {
        "{{PROJECT_NAME}}": "./dist/cli.mjs",
      },
      main: "./dist/cli.mjs",
      files: ["dist"],
      engines: {
        node: ">=22",
      },
      packageManager: "pnpm@10.32.1",
      scripts: {
        build: "tsdown",
        dev: "tsdown --watch",
        start: "node ./dist/cli.mjs",
        test: "vitest run",
        "test:watch": "vitest",
        typecheck: "tsc --noEmit",
      },
      dependencies: {
        "@clack/prompts": "^0.9.0",
      },
      devDependencies: {
        "@types/node": "^22.10.0",
        tsdown: "^0.21.7",
        typescript: "^5.8.0",
        vitest: "^4.1.1",
      },
    },
    ".gitignore": ["dist/", "*.tsbuildinfo"],
  },
};

export default presetCli;
