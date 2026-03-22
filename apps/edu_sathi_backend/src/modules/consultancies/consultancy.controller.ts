import type { Request, Response } from "express";
import { listConsultancies } from "@edu/domain";

export class ConsultancyController {
  async list(_request: Request, response: Response) {
    const result = await listConsultancies();

    response.status(200).json({
      data: result
    });
  }
}

