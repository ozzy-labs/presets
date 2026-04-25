# @ozzylabs/preset-web

OzzyLabs web preset for [create-agentic-app](https://github.com/ozzy-labs/create-agentic-app). Bundles Astro + React + Tailwind + Vite configuration on top of [`@ozzylabs/preset-base`](../preset-base).

This v0.0.0 scaffold establishes the preset module shape (per [ADR-0017](https://github.com/ozzy-labs/handbook/blob/main/adr/0017-presets-initial-composition.md)). The actual configuration files are added in subsequent releases.

## Scope

Per [ADR-0017](https://github.com/ozzy-labs/handbook/blob/main/adr/0017-presets-initial-composition.md) § preset-web:

| Category | Contents |
| --- | --- |
| Framework | Astro base config (`astro.config.mjs` template) |
| UI | React 18+ `tsconfig` extension, Tailwind CSS + PostCSS base |
| Build | Vite-related configuration (where needed) |
| Reference | Common parts of `starlight-theme`, `ozzylabs.com`, `road/packages/docs` |

Web frameworks not adopted at OzzyLabs (Next.js / Nuxt / SvelteKit) are intentionally excluded.

## Usage

```json
// agentic-app.config.json
{
  "presets": ["@ozzylabs/preset-base", "@ozzylabs/preset-web"]
}
```

## License

[MIT](../../LICENSE)
