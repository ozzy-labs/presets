import { describe, expect, it } from "vitest";
import preset from "../src/index.js";

describe("@ozzylabs/preset-base", () => {
  it("declares the canonical preset name", () => {
    expect(preset.name).toBe("base");
  });

  it("does not declare requires (it is the root preset)", () => {
    expect(preset.requires).toBeUndefined();
  });

  describe("files", () => {
    const expectedPaths = [
      "biome.json",
      ".markdownlint-cli2.yaml",
      ".yamlfmt.yaml",
      ".yamllint.yaml",
      ".mdformat.toml",
      "lefthook-base.yaml",
      "lefthook.yaml",
      ".commitlintrc.yaml",
      "trivy.yaml",
      ".mise.toml",
      ".editorconfig",
      ".gitattributes",
      ".gitignore",
      "LICENSE",
      "README.md",
      "README.ja.md",
      "AGENTS.md",
      "CLAUDE.md",
      "CONTRIBUTING.md",
      "SECURITY.md",
    ] as const;

    it.each(expectedPaths)("includes %s with non-empty content", (path) => {
      expect(preset.files[path]).toBeDefined();
      expect(preset.files[path]?.length ?? 0).toBeGreaterThan(0);
    });

    it("LICENSE looks like an MIT license", () => {
      expect(preset.files.LICENSE).toContain("MIT License");
      expect(preset.files.LICENSE).toContain("Permission is hereby granted");
    });

    it("biome.json is valid JSON", () => {
      expect(() => JSON.parse(preset.files["biome.json"] ?? "")).not.toThrow();
    });

    it("lefthook.yaml extends lefthook-base.yaml", () => {
      expect(preset.files["lefthook.yaml"]).toContain("lefthook-base.yaml");
    });

    it(".commitlintrc.yaml extends @commitlint/config-conventional", () => {
      expect(preset.files[".commitlintrc.yaml"]).toContain(
        "@commitlint/config-conventional",
      );
    });
  });

  describe("merge", () => {
    it("targets package.json with the documented script set", () => {
      const pkg = preset.merge["package.json"] as {
        scripts: Record<string, string>;
        devDependencies: Record<string, string>;
        engines: Record<string, string>;
      };

      expect(pkg.scripts.lint).toBeDefined();
      expect(pkg.scripts["lint:all"]).toContain("lint:md");
      expect(pkg.scripts["lint:secrets"]).toContain("gitleaks");
      expect(pkg.scripts.prepare).toContain("lefthook install");
      expect(pkg.devDependencies["@biomejs/biome"]).toBeDefined();
      expect(pkg.devDependencies["@commitlint/cli"]).toBeDefined();
      expect(pkg.engines.node).toBe(">=22");
    });
  });
});
