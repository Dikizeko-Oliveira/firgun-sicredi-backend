import { PrismaResponsesRepository } from "../../repositories/prisma/prisma-responses-repository";

import { GetScoresService } from "../score/get-scores";

export function makeGetScoreService() {
  const prismaResponseRepository = new PrismaResponsesRepository();
  const getScoreService = new GetScoresService(prismaResponseRepository);

  return getScoreService;
}
