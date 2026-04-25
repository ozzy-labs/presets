import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
//#region src/index.ts
const templatesDir = resolve(dirname(fileURLToPath(import.meta.url)), "../templates");
function read(name) {
	return readFileSync(resolve(templatesDir, name), "utf8");
}
const presetBase = {
	name: "base",
	files: {
		"biome.json": read("biome.json"),
		".markdownlint-cli2.yaml": read(".markdownlint-cli2.yaml"),
		".yamlfmt.yaml": read(".yamlfmt.yaml"),
		".yamllint.yaml": read(".yamllint.yaml"),
		".mdformat.toml": read(".mdformat.toml"),
		"lefthook-base.yaml": read("lefthook-base.yaml"),
		"lefthook.yaml": read("lefthook.yaml"),
		".commitlintrc.yaml": read(".commitlintrc.yaml"),
		"trivy.yaml": read("trivy.yaml"),
		".mise.toml": read(".mise.toml"),
		".editorconfig": read(".editorconfig"),
		".gitattributes": read(".gitattributes"),
		".gitignore": read(".gitignore"),
		LICENSE: read("LICENSE"),
		"README.md": read("README.md"),
		"README.ja.md": read("README.ja.md"),
		"AGENTS.md": read("AGENTS.md"),
		"CLAUDE.md": read("CLAUDE.md"),
		"CONTRIBUTING.md": read("CONTRIBUTING.md"),
		"SECURITY.md": read("SECURITY.md")
	},
	merge: { "package.json": {
		type: "module",
		engines: { node: ">=22" },
		scripts: {
			prepare: "lefthook install || true",
			lint: "biome check .",
			"lint:fix": "biome check --write .",
			"lint:md": "markdownlint-cli2 '**/*.md' '#**/node_modules' '#CHANGELOG.md'",
			"lint:yaml": "yamllint -c .yamllint.yaml .",
			"lint:secrets": "gitleaks detect --no-banner",
			"lint:all": "pnpm run lint && pnpm run lint:md && pnpm run lint:yaml && pnpm run lint:secrets"
		},
		devDependencies: {
			"@biomejs/biome": "^2.4.8",
			"@commitlint/cli": "^20.0.0",
			"@commitlint/config-conventional": "^20.0.0"
		}
	} }
};
//#endregion
export { presetBase as default };
