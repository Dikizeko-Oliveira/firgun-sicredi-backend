import { Prisma, RecipientUsers } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { RecipientUsersRepository } from "../recipient-users-repository";

export class PrismaRecipientUsersRepository
  implements RecipientUsersRepository
{
  async create(data: Prisma.RecipientUsersUncheckedCreateInput) {
    const response = await prisma.recipientUsers.create({
      data,
    });

    return response;
  }

  async findById(id: string) {
    const response = await prisma.recipientUsers.findFirst({
      where: {
        id,
      },
    });

    return response;
  }

  async listAll() {
    const questions = await prisma.recipientUsers.findMany();

    return questions;
  }

  async save(data: RecipientUsers) {
    const response = await prisma.recipientUsers.update({
      where: {
        id: data.id,
      },
      data,
    });

    return response;
  }
}
