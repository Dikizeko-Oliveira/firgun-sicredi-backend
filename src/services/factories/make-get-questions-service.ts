import { PrismaQuestionsRepository } from "../../repositories/prisma/prisma-questions-repository";
import { GetQuestionsService } from "../questions/get-questions";

export function makeGetQuestionsService() {
  const prismaQuestionsRepository = new PrismaQuestionsRepository();
  const getQuestionsService = new GetQuestionsService(
    prismaQuestionsRepository
  );

  return getQuestionsService;
}
