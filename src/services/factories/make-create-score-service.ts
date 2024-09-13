import { PrismaResponsesRepository } from "../../repositories/prisma/prisma-responses-repository";
import { PrismaCompaniesRepository } from "../../repositories/prisma/prisma-companies-repository";

import { CreateScoreService } from "../score/create-score";

export function makeCreateScoreService() {
  const prismaResponseRepository = new PrismaResponsesRepository();
  const prismaCompaniesRepository = new PrismaCompaniesRepository();
  const createScoreService = new CreateScoreService(
    prismaResponseRepository,
    prismaCompaniesRepository
  );

  return createScoreService;
}
