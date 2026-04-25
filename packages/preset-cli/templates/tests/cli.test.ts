import { describe, expect, it } from "vitest";

describe("cli smoke", () => {
  it("imports the entry without throwing", async () => {
    await expect(import("../src/cli.js")).resolves.toBeDefined();
  });
});
