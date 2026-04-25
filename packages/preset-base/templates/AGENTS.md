# AGENTS.md

このファイルは AI エージェント向けの共通 instructions です。

## 基本方針

- 日本語で応答する
- 推奨案とその理由を提示する
- `.env` ファイルは読み取り・ステージングしない
- 破壊的な Git 操作を避ける

## Tech Stack

- Runtime: Node.js (ESM, >= 22)
- Package manager: pnpm
- Version management: mise (`.mise.toml`)

## 主要コマンド

```bash
pnpm install        # 依存関係インストール
pnpm lint:all       # Biome + markdownlint + yamllint + gitleaks
```

## 検証（必須）

コード変更後、報告前に以下を通すこと:

1. `pnpm lint:all` — 全リンター通過

## 規約

言語・コミット・ブランチ・PR のルールは README.md を参照すること。
