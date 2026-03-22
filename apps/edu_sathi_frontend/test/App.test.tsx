import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "../src/App";

describe("App", () => {
  it("renders the landing hero content", () => {
    render(<App />);

    expect(
      screen.getByText(/find the right consultancy, country, university, and course/i)
    ).toBeInTheDocument();
  });
});

