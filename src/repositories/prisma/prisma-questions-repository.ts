import { Prisma, Questions } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { QuestionsRepository } from "../questions-repository";

export class PrismaQuestionsRepository implements QuestionsRepository {
  async create(data: Prisma.QuestionsCreateInput) {
    const question = await prisma.questions.create({
      data,
    });

    return question;
  }

  async listAll() {
    const questions = await prisma.questions.findMany({
      include: { answers: true },
    });

    return questions;
  }

  async save(data: Questions) {
    const question = await prisma.questions.update({
      where: {
        id: data.id,
      },
      data,
    });

    return question;
  }
}
