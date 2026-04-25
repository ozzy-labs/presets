# AGENTS.md

このファイルは AI エージェント向けの共通 instructions です。

## 基本方針

- 日本語で応答する
- 推奨案とその理由を提示する
- `.env` ファイルは読み取り・ステージングしない
- 破壊的な Git 操作を避ける

## プロジェクト概要

`@ozzylabs/preset-base` / `-web` / `-cli` を提供する pnpm workspaces monorepo。各 preset は [create-agentic-app](https://github.com/ozzy-labs/create-agentic-app) の external preset loader から `extends` で読み込まれる。

handbook [ADR-0017](https://github.com/ozzy-labs/handbook/blob/main/adr/0017-presets-initial-composition.md) で初期構成が決定済み。配布方式は **CAA external preset loading（npm install + extends）** で、Renovate sync は採用しない（preset は scaffold-only 資産）。

## Tech Stack

- Runtime: Node.js (ESM)
- Package manager: pnpm（workspaces）
- Version management: mise (`.mise.toml`)
- Build: tsdown（package 単位）
- Test: vitest

## 主要コマンド

```bash
pnpm install               # 依存関係インストール（workspace 全体）
pnpm -r run build          # 全 package を tsdown でビルド
pnpm lint:all              # Biome + markdownlint + yamllint + gitleaks
pnpm -r run test           # 全 package の vitest 実行
```

個別 package で作業する場合:

```bash
pnpm --filter @ozzylabs/preset-base run build
```

## 検証（必須）

コード変更後、報告前に以下を通すこと:

1. `pnpm -r run typecheck` — 型チェック通過
2. `pnpm -r run build` — 全 package ビルド成功
3. `pnpm lint:all` — 全リンター通過

## ディレクトリ構成

- `packages/preset-base/` — 共通最小構成 preset（`@ozzylabs/preset-base`）
- `packages/preset-web/` — Astro + React + Tailwind + Vite preset（`@ozzylabs/preset-web`）
- `packages/preset-cli/` — Node.js CLI preset（`@ozzylabs/preset-cli`）
- 各 package: `src/index.ts`（Preset export）/ `templates/`（生成ファイル）/ `dist/`（build 出力）
- `.dev-config/sync.yaml` — commons + skills consumer メタデータ

## 規約

言語・コミット・ブランチ・PR のルールは README.md を参照すること。

## Adapter Files

| Agent | Configuration |
|-------|---------------|
| Claude Code | `CLAUDE.md`, `.claude/` |
| Gemini CLI | `.gemini/settings.json` → `AGENTS.md` |
| Codex CLI | `AGENTS.md` + `.agents/skills/` |
| GitHub Copilot | `AGENTS.md` + `.agents/skills/` |
