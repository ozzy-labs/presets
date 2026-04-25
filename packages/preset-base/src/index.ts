// @ozzylabs/preset-base — OzzyLabs base preset for create-agentic-app.
//
// Bundles shared linters, formatters, git hooks, editor configuration, and
// document scaffolds. Loaded by CAA via the external preset loader:
//
//     // agentic-app.config.json
//     { "presets": ["@ozzylabs/preset-base"] }
//
// See handbook ADR-0017 § preset-base for the bundled inventory.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Preset } from "./types.js";

const here = dirname(fileURLToPath(import.meta.url));
const templatesDir = resolve(here, "../templates");

function read(name: string): string {
  return readFileSync(resolve(templatesDir, name), "utf8");
}

const presetBase: Preset = {
  name: "base",
  files: {
    // Linter / Formatter
    "biome.json": read("biome.json"),
    ".markdownlint-cli2.yaml": read(".markdownlint-cli2.yaml"),
    ".yamlfmt.yaml": read(".yamlfmt.yaml"),
    ".yamllint.yaml": read(".yamllint.yaml"),
    ".mdformat.toml": read(".mdformat.toml"),

    // Git hooks
    "lefthook-base.yaml": read("lefthook-base.yaml"),
    "lefthook.yaml": read("lefthook.yaml"),

    // Commit
    ".commitlintrc.yaml": read(".commitlintrc.yaml"),

    // Security
    "trivy.yaml": read("trivy.yaml"),

    // Tooling
    ".mise.toml": read(".mise.toml"),

    // Editor
    ".editorconfig": read(".editorconfig"),
    ".gitattributes": read(".gitattributes"),
    ".gitignore": read(".gitignore"),

    // License
    LICENSE: read("LICENSE"),

    // Docs scaffold
    "README.md": read("README.md"),
    "README.ja.md": read("README.ja.md"),
    "AGENTS.md": read("AGENTS.md"),
    "CLAUDE.md": read("CLAUDE.md"),
    "CONTRIBUTING.md": read("CONTRIBUTING.md"),
    "SECURITY.md": read("SECURITY.md"),
  },
  merge: {
    "package.json": {
      type: "module",
      engines: {
        node: ">=22",
      },
      scripts: {
        prepare: "lefthook install || true",
        lint: "biome check .",
        "lint:fix": "biome check --write .",
        "lint:md":
          "markdownlint-cli2 '**/*.md' '#**/node_modules' '#CHANGELOG.md'",
        "lint:yaml": "yamllint -c .yamllint.yaml .",
        "lint:secrets": "gitleaks detect --no-banner",
        "lint:all":
          "pnpm run lint && pnpm run lint:md && pnpm run lint:yaml && pnpm run lint:secrets",
      },
      devDependencies: {
        "@biomejs/biome": "^2.4.8",
        "@commitlint/cli": "^20.0.0",
        "@commitlint/config-conventional": "^20.0.0",
      },
    },
  },
};

export default presetBase;
export type { Preset };
