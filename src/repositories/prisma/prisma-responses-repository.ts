import { Prisma, Responses } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { ResponsesRepository } from "../responses-repository";

export class PrismaResponsesRepository implements ResponsesRepository {
  async create(data: Prisma.ResponsesCreateInput) {
    const response = await prisma.responses.create({
      data,
    });

    return response;
  }

  async findById(id: string) {
    const response = await prisma.responses.findFirst({
      where: {
        id,
      },
    });

    return response;
  }

  async getScoresToUpdate() {
    const response = await prisma.responses.findMany({
      where: {
        already_sent: false,
      },
      include: { Companies: true },
    });

    return response;
  }

  async findByCpf(cpf: string) {
    const response = await prisma.responses.findFirst({
      where: {
        cpf,
      },
    });

    return response;
  }

  async save(data: Responses) {
    const response = await prisma.responses.update({
      where: {
        id: data.id,
      },
      data,
    });

    return response;
  }
}
