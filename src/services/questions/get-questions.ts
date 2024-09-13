import { Questions } from "@prisma/client";
import { QuestionsRepository } from "@/repositories/questions-repository";

export class GetQuestionsService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(): Promise<Questions[]> {
    const questions = await this.questionsRepository.listAll();

    return questions;
  }
}
