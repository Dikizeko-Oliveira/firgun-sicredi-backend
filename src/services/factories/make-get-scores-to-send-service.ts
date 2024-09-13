import { PrismaResponsesRepository } from "../../repositories/prisma/prisma-responses-repository";

import { GetScoresToSendEmailsService } from "../score/get-scores-to-send";

export function makeGetScoreToSendEmailsService() {
  const prismaResponseRepository = new PrismaResponsesRepository();
  const getScoreService = new GetScoresToSendEmailsService(
    prismaResponseRepository
  );

  return getScoreService;
}
