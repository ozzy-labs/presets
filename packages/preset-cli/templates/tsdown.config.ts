import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/cli.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  outDir: "dist",
  shims: true,
  platform: "node",
  target: "node22",
});
