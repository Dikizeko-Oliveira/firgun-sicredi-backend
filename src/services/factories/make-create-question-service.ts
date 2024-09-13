import { PrismaQuestionsRepository } from "../../repositories/prisma/prisma-questions-repository";
import { CreateQuestionService } from "../questions/create-question";

export function makeCreateQuestionService() {
  const prismaQuestionsRepository = new PrismaQuestionsRepository();
  const createQuestionService = new CreateQuestionService(
    prismaQuestionsRepository
  );

  return createQuestionService;
}
