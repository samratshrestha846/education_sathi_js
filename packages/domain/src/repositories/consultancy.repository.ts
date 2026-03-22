import type { Consultancy } from "../entities/consultancy";

export interface ConsultancyRepository {
  findAll(): Promise<Consultancy[]>;
}

