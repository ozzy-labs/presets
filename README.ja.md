[English](README.md) | 日本語

# OzzyLabs presets

OzzyLabs [create-agentic-app](https://github.com/ozzy-labs/create-agentic-app) 用 preset の pnpm workspaces monorepo。

[handbook ADR-0017](https://github.com/ozzy-labs/handbook/blob/main/adr/0017-presets-initial-composition.md) に基づき、CAA が `extends` で読み込む 3 つの external preset を同梱:

| パッケージ | 用途 |
| --- | --- |
| [`@ozzylabs/preset-base`](./packages/preset-base) | 共通最小構成: linter / formatter / git hooks / editor |
| [`@ozzylabs/preset-web`](./packages/preset-web) | Web スタック: Astro + React + Tailwind + Vite（preset-base を extends） |
| [`@ozzylabs/preset-cli`](./packages/preset-cli) | Node.js CLI: tsdown + @clack/prompts + vitest（preset-base を extends） |

各 package は release-please で個別 versioning。v0.0.0 はモジュール形状を確立する scaffold で、実 preset 内容は後続リリースで populate する。

## 配布モデル

Preset は **scaffold-only な資産**で、プロジェクト生成時に 1 度だけ consume され、生成済みリポにベイクインされる。意図的に Renovate sync は採用しない（Renovate sync は生涯同期される `@ozzylabs/skills` と `commons` 専用）。詳細は [ADR-0017](https://github.com/ozzy-labs/handbook/blob/main/adr/0017-presets-initial-composition.md) § 配布方式 を参照。

## Consumer セットアップ

プロジェクトの `agentic-app.config.json`:

```json
{
  "presets": ["@ozzylabs/preset-base", "@ozzylabs/preset-web"]
}
```

`npx @ozzylabs/create-agentic-app` 実行で指定 preset から scaffold される。

## ローカル開発

```bash
pnpm install
pnpm -r run build
pnpm lint:all
pnpm -r run test
```

各 package は独自 `tsdown.config.ts` / `tsconfig.json` を持つ。package を跨ぐ編集は commit 前に `pnpm -r run typecheck` を通すこと。

## 規約

- Commit: [Conventional Commits](https://www.conventionalcommits.org/)（`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`）
- ブランチ: `<type>/<short-description>`（例: `feat/preset-base-biome-config`）
- PR: squash merge のみ、タイトルは Conventional Commits 形式

## License

[MIT](./LICENSE)
