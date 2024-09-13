import { PrismaResponsesRepository } from "../../repositories/prisma/prisma-responses-repository";

import { UpdateScoreService } from "../score/update-score";

export function makeUpdateScoreService() {
  const prismaResponseRepository = new PrismaResponsesRepository();
  const updateScoreService = new UpdateScoreService(prismaResponseRepository);

  return updateScoreService;
}
