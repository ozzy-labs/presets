import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
//#region src/index.ts
const templatesDir = resolve(dirname(fileURLToPath(import.meta.url)), "../templates");
function read(name) {
	return readFileSync(resolve(templatesDir, name), "utf8");
}
const presetCli = {
	name: "cli",
	requires: ["@ozzylabs/preset-base"],
	files: {
		"tsdown.config.ts": read("tsdown.config.ts"),
		"tsconfig.json": read("tsconfig.json"),
		"vitest.config.ts": read("vitest.config.ts"),
		"src/cli.ts": read("src/cli.ts"),
		"tests/cli.test.ts": read("tests/cli.test.ts")
	},
	merge: {
		"package.json": {
			type: "module",
			bin: { "{{PROJECT_NAME}}": "./dist/cli.mjs" },
			main: "./dist/cli.mjs",
			files: ["dist"],
			engines: { node: ">=22" },
			packageManager: "pnpm@10.32.1",
			scripts: {
				build: "tsdown",
				dev: "tsdown --watch",
				start: "node ./dist/cli.mjs",
				test: "vitest run",
				"test:watch": "vitest",
				typecheck: "tsc --noEmit"
			},
			dependencies: { "@clack/prompts": "^0.9.0" },
			devDependencies: {
				"@types/node": "^22.10.0",
				tsdown: "^0.21.7",
				typescript: "^5.8.0",
				vitest: "^4.1.1"
			}
		},
		".gitignore": ["dist/", "*.tsbuildinfo"]
	}
};
//#endregion
export { presetCli as default };
