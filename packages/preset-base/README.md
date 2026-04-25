# @ozzylabs/preset-base

OzzyLabs base preset for [create-agentic-app](https://github.com/ozzy-labs/create-agentic-app). Bundles the shared linter, formatter, git-hook, and editor configuration that every OzzyLabs project depends on.

This v0.0.0 scaffold establishes the preset module shape (per [ADR-0017](https://github.com/ozzy-labs/handbook/blob/main/adr/0017-presets-initial-composition.md)). The actual configuration files are added in subsequent releases.

## Scope

Per [ADR-0017](https://github.com/ozzy-labs/handbook/blob/main/adr/0017-presets-initial-composition.md) § preset-base, this preset bundles:

| Category | Contents |
| --- | --- |
| Linter / Formatter | `biome.json`, `.markdownlint-cli2.yaml`, `.yamlfmt.yaml`, `.yamllint.yaml`, `.mdformat.toml` |
| Git hooks | `lefthook-base.yaml`, minimal `lefthook.yaml` |
| Commit | `.commitlintrc.yaml` |
| Security | `trivy.yaml`, gitleaks configuration |
| Tooling | `.mise.toml` (base only) |
| Editor | `.editorconfig`, `.gitattributes`, base `.gitignore` |
| License | MIT `LICENSE` template |
| Docs scaffold | `README.md` / `README.ja.md` / `AGENTS.md` / `CLAUDE.md` / `CONTRIBUTING.md` / `SECURITY.md` templates |

## Usage

```json
// agentic-app.config.json
{
  "presets": ["@ozzylabs/preset-base"]
}
```

Then run `npx @ozzylabs/create-agentic-app` to scaffold your project.

## License

[MIT](../../LICENSE)
