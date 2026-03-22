import { describe, expect, it } from "vitest";
import type { ApiResponse } from "../src";

describe("ApiResponse", () => {
  it("supports generic payload typing", () => {
    const response: ApiResponse<{ ok: boolean }> = {
      data: { ok: true }
    };

    expect(response.data.ok).toBe(true);
  });
});
