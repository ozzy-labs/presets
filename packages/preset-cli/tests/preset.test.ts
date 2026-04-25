import { describe, expect, it } from "vitest";
import preset from "../src/index.js";

describe("@ozzylabs/preset-cli", () => {
  it("declares the canonical preset name", () => {
    expect(preset.name).toBe("cli");
  });

  it("requires preset-base", () => {
    expect(preset.requires).toEqual(["@ozzylabs/preset-base"]);
  });

  describe("files", () => {
    const expectedPaths = [
      "tsdown.config.ts",
      "tsconfig.json",
      "vitest.config.ts",
      "src/cli.ts",
      "tests/cli.test.ts",
    ] as const;

    it.each(expectedPaths)("includes %s with non-empty content", (path) => {
      expect(preset.files[path]).toBeDefined();
      expect(preset.files[path]?.length ?? 0).toBeGreaterThan(0);
    });

    it("tsdown.config.ts targets node22 and emits dts", () => {
      const cfg = preset.files["tsdown.config.ts"] ?? "";
      expect(cfg).toContain("target: \"node22\"");
      expect(cfg).toContain("dts: true");
    });

    it("src/cli.ts is a Node shebanged entry that uses @clack/prompts", () => {
      const entry = preset.files["src/cli.ts"] ?? "";
      expect(entry.startsWith("#!/usr/bin/env node")).toBe(true);
      expect(entry).toContain("@clack/prompts");
    });

    it("tsconfig.json is valid JSON with bundler moduleResolution", () => {
      const tsconfig = JSON.parse(preset.files["tsconfig.json"] ?? "{}");
      expect(tsconfig.compilerOptions.moduleResolution).toBe("Bundler");
    });
  });

  describe("merge", () => {
    it("merges a CLI-shaped package.json (bin entry, build/test scripts, @clack/prompts)", () => {
      const pkg = preset.merge["package.json"] as {
        type: string;
        bin: Record<string, string>;
        engines: Record<string, string>;
        packageManager: string;
        scripts: Record<string, string>;
        dependencies: Record<string, string>;
        devDependencies: Record<string, string>;
        files: string[];
      };

      expect(pkg.type).toBe("module");
      expect(Object.values(pkg.bin)).toContain("./dist/cli.mjs");
      expect(pkg.engines.node).toBe(">=22");
      expect(pkg.packageManager.startsWith("pnpm@")).toBe(true);
      expect(pkg.scripts.build).toBe("tsdown");
      expect(pkg.scripts.test).toBe("vitest run");
      expect(pkg.dependencies["@clack/prompts"]).toBeDefined();
      expect(pkg.devDependencies.tsdown).toBeDefined();
      expect(pkg.devDependencies.vitest).toBeDefined();
      expect(pkg.files).toContain("dist");
    });

    it("appends CLI-specific entries to .gitignore", () => {
      expect(preset.merge[".gitignore"]).toEqual(
        expect.arrayContaining(["dist/", "*.tsbuildinfo"]),
      );
    });
  });
});
