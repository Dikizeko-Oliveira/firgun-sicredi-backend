import { QuestionsRepository } from "@/repositories/questions-repository";

interface CreateQuestionRequest {
  name: string;
  type: string;
  screen: number;
}

export class CreateQuestionService {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ name, type, screen }: CreateQuestionRequest) {
    const questions = await this.questionsRepository.create({
      name,
      type,
      screen,
    });

    return questions;
  }
}
