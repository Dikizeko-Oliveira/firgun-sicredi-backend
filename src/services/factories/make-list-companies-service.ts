import { PrismaCompaniesRepository } from "../../repositories/prisma/prisma-companies-repository";
import { ListCompaniesService } from "../companies/list-companies";

export function makeListCompaniesService() {
  const prismaCompaniesRepository = new PrismaCompaniesRepository();
  const getCompaniesService = new ListCompaniesService(
    prismaCompaniesRepository
  );

  return getCompaniesService;
}
