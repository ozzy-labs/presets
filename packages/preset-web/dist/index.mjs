import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
//#region src/index.ts
const templatesDir = resolve(dirname(fileURLToPath(import.meta.url)), "../templates");
function read(name) {
	return readFileSync(resolve(templatesDir, name), "utf8");
}
const presetWeb = {
	name: "web",
	requires: ["@ozzylabs/preset-base"],
	files: {
		"astro.config.mjs": read("astro.config.mjs"),
		"tsconfig.json": read("tsconfig.json"),
		"src/styles/global.css": read("src/styles/global.css"),
		".vscode/settings.json": read(".vscode/settings.json")
	},
	merge: {
		"package.json": {
			type: "module",
			scripts: {
				dev: "astro dev",
				build: "astro build",
				preview: "astro preview",
				astro: "astro",
				typecheck: "astro check"
			},
			dependencies: {
				astro: "^5.0.0",
				react: "^19.0.0",
				"react-dom": "^19.0.0",
				"@astrojs/react": "^4.0.0",
				"@tailwindcss/vite": "^4.0.0",
				tailwindcss: "^4.0.0"
			},
			devDependencies: {
				"@types/react": "^19.0.0",
				"@types/react-dom": "^19.0.0"
			}
		},
		".gitignore": [
			"dist/",
			".astro/",
			"*.tsbuildinfo"
		]
	}
};
//#endregion
export { presetWeb as default };
