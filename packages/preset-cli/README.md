# @ozzylabs/preset-cli

OzzyLabs Node.js CLI preset for [create-agentic-app](https://github.com/ozzy-labs/create-agentic-app). Bundles tsdown + @clack/prompts + vitest setup on top of [`@ozzylabs/preset-base`](../preset-base).

This v0.0.0 scaffold establishes the preset module shape (per [ADR-0017](https://github.com/ozzy-labs/handbook/blob/main/adr/0017-presets-initial-composition.md)). The actual configuration files are added in subsequent releases.

## Scope

Per [ADR-0017](https://github.com/ozzy-labs/handbook/blob/main/adr/0017-presets-initial-composition.md) § preset-cli:

| Category | Contents |
| --- | --- |
| Build | `tsdown` configuration |
| Prompts | `@clack/prompts` TypeScript setup |
| Test | `vitest` configuration (unit + smoke) |
| Package | `package.json` template (`type: module`, `bin`, `engines.node>=22`, `packageManager: pnpm`) |
| Reference | Common parts of `create-agentic-app`, `knowledge-mcp-server` |

The `bin` entry is the differentiator: npm libraries without a `bin` are handled separately by the library preset (see [handbook#53](https://github.com/ozzy-labs/handbook/issues/53) / [create-agentic-app#215](https://github.com/ozzy-labs/create-agentic-app/issues/215)).

## Usage

```json
// agentic-app.config.json
{
  "presets": ["@ozzylabs/preset-base", "@ozzylabs/preset-cli"]
}
```

## License

[MIT](../../LICENSE)
