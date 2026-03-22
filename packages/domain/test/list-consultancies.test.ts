import { describe, expect, it } from "vitest";
import { listConsultancies } from "../src/use-cases/list-consultancies";

describe("listConsultancies", () => {
  it("returns consultancies from the repository", async () => {
    const repository = {
      findAll: async () => [
        {
          id: "c-1",
          name: "North Star Consultancy",
          partnerCountries: ["UK"],
          averageRating: 4.2,
          isFeatured: false
        }
      ]
    };

    await expect(listConsultancies(repository)).resolves.toEqual([
      {
        id: "c-1",
        name: "North Star Consultancy",
        partnerCountries: ["UK"],
        averageRating: 4.2,
        isFeatured: false
      }
    ]);
  });
});

