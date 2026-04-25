import { describe, expect, it } from "vitest";
import preset from "../src/index.js";

describe("@ozzylabs/preset-web", () => {
  it("declares the canonical preset name", () => {
    expect(preset.name).toBe("web");
  });

  it("requires preset-base", () => {
    expect(preset.requires).toEqual(["@ozzylabs/preset-base"]);
  });

  describe("files", () => {
    const expectedPaths = [
      "astro.config.mjs",
      "tsconfig.json",
      "src/styles/global.css",
      ".vscode/settings.json",
    ] as const;

    it.each(expectedPaths)("includes %s with non-empty content", (path) => {
      expect(preset.files[path]).toBeDefined();
      expect(preset.files[path]?.length ?? 0).toBeGreaterThan(0);
    });

    it("astro.config.mjs wires the React integration and tailwindcss vite plugin", () => {
      const cfg = preset.files["astro.config.mjs"] ?? "";
      expect(cfg).toContain("@astrojs/react");
      expect(cfg).toContain("@tailwindcss/vite");
    });

    it("tsconfig.json extends astro/tsconfigs/strict and uses jsx react-jsx", () => {
      const tsconfig = JSON.parse(preset.files["tsconfig.json"] ?? "{}");
      expect(tsconfig.extends).toBe("astro/tsconfigs/strict");
      expect(tsconfig.compilerOptions.jsx).toBe("react-jsx");
    });

    it("global.css imports tailwindcss", () => {
      expect(preset.files["src/styles/global.css"]).toContain(
        '@import "tailwindcss"',
      );
    });

    it(".vscode/settings.json is valid JSON with biome formatter default", () => {
      const settings = JSON.parse(preset.files[".vscode/settings.json"] ?? "{}");
      expect(settings["editor.defaultFormatter"]).toBe("biomejs.biome");
    });
  });

  describe("merge", () => {
    it("adds astro/react/tailwind dependencies and dev/build/preview scripts", () => {
      const pkg = preset.merge["package.json"] as {
        scripts: Record<string, string>;
        dependencies: Record<string, string>;
        devDependencies: Record<string, string>;
      };

      expect(pkg.scripts.dev).toBe("astro dev");
      expect(pkg.scripts.build).toBe("astro build");
      expect(pkg.scripts.preview).toBe("astro preview");
      expect(pkg.dependencies.astro).toBeDefined();
      expect(pkg.dependencies.react).toBeDefined();
      expect(pkg.dependencies["@astrojs/react"]).toBeDefined();
      expect(pkg.dependencies["@tailwindcss/vite"]).toBeDefined();
      expect(pkg.dependencies.tailwindcss).toBeDefined();
      expect(pkg.devDependencies["@types/react"]).toBeDefined();
    });

    it("appends Astro-specific entries to .gitignore", () => {
      expect(preset.merge[".gitignore"]).toEqual(
        expect.arrayContaining(["dist/", ".astro/", "*.tsbuildinfo"]),
      );
    });
  });
});
