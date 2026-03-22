import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";

describe("createApp", () => {
  it("registers the health route", () => {
    const app = createApp();

    expect(app).toBeDefined();
  });
});

