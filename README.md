English | [日本語](README.ja.md)

# OzzyLabs presets

pnpm workspaces monorepo for OzzyLabs [create-agentic-app](https://github.com/ozzy-labs/create-agentic-app) presets.

Per [handbook ADR-0017](https://github.com/ozzy-labs/handbook/blob/main/adr/0017-presets-initial-composition.md), this repo bundles three external presets that CAA loads via `extends`:

| Package | Purpose |
| --- | --- |
| [`@ozzylabs/preset-base`](./packages/preset-base) | Common base: linters, formatters, git hooks, editor configuration |
| [`@ozzylabs/preset-web`](./packages/preset-web) | Web stack: Astro + React + Tailwind + Vite (extends preset-base) |
| [`@ozzylabs/preset-cli`](./packages/preset-cli) | Node.js CLI: tsdown + @clack/prompts + vitest (extends preset-base) |

Each package versions independently via release-please. v0.0.0 establishes the module shape; subsequent releases populate the actual configuration.

## Distribution model

Presets are **scaffold-only assets**: consumed once at project creation, then baked into the resulting repository. They are intentionally **not** delivered via Renovate sync — that mechanism is reserved for `@ozzylabs/skills` and `commons`, which are continuously synced over a project's lifetime. See [ADR-0017](https://github.com/ozzy-labs/handbook/blob/main/adr/0017-presets-initial-composition.md) § 配布方式 for the rationale.

## Consumer setup

In your project's `agentic-app.config.json`:

```json
{
  "presets": ["@ozzylabs/preset-base", "@ozzylabs/preset-web"]
}
```

Then run `npx @ozzylabs/create-agentic-app` to scaffold using the listed presets.

## Local development

```bash
pnpm install
pnpm -r run build
pnpm lint:all
pnpm -r run test
```

Each package has its own `tsdown.config.ts` and `tsconfig.json`. Cross-package edits should pass `pnpm -r run typecheck` before committing.

## Conventions

- Commits: [Conventional Commits](https://www.conventionalcommits.org/) (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`)
- Branches: `<type>/<short-description>` (e.g. `feat/preset-base-biome-config`)
- PRs: squash merge only, title in Conventional Commits format

## License

[MIT](./LICENSE)
