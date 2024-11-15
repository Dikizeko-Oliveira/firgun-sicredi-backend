import { Prisma, Companies } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { CompaniesRepository, CompsType } from "../companies-repository";

export class PrismaCompaniesRepository implements CompaniesRepository {
  async create(data: Prisma.CompaniesCreateInput) {
    const response = await prisma.companies.create({
      data,
    });

    return response;
  }

  async findById(id: string) {
    const response = await prisma.companies.findUnique({
      where: {
        id,
      },
    });

    return response;
  }

  async findBySlug(slug: string) {
    const response = await prisma.companies.findUnique({
      where: {
        slug,
      },
    });

    return response;
  }

  async listAll(): Promise<CompsType[]> {
    const response = (await prisma.companies.findMany({
      include: { Responses: true, RecipientUsers: true },
    })) as unknown as CompsType[];

    return response;
  }

  // async listAll(): Promise<CompsType[]> {
  //   const response = (await prisma.companies.findMany({
  //     include: { Responses: true },
  //     where: { Responses: { some: { already_sent: false } } },
  //   })) as unknown as CompsType[];

  //   return response;
  // }

  async list() {
    const response = await prisma.companies.findMany();

    return response;
  }

  async save(data: Companies) {
    const response = await prisma.companies.update({
      where: {
        id: data.id,
      },
      data,
    });

    return response;
  }
}
