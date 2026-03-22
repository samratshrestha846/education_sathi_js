import type { Consultancy } from "../entities/consultancy";
import type { ConsultancyRepository } from "../repositories/consultancy.repository";

class InMemoryConsultancyRepository implements ConsultancyRepository {
  async findAll(): Promise<Consultancy[]> {
    return [
      {
        id: "sample-consultancy",
        name: "Sample Global Education",
        partnerCountries: ["Australia", "Canada"],
        averageRating: 4.5,
        isFeatured: true
      }
    ];
  }
}

export const listConsultancies = async (
  repository: ConsultancyRepository = new InMemoryConsultancyRepository()
) => {
  return repository.findAll();
};

