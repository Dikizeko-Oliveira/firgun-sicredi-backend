import { PrismaCompaniesRepository } from "../../repositories/prisma/prisma-companies-repository";
import { GetCompaniesService } from "../companies/get-companies";

export function makeGetCompaniesService() {
  const prismaCompaniesRepository = new PrismaCompaniesRepository();
  const getCompaniesService = new GetCompaniesService(
    prismaCompaniesRepository
  );

  return getCompaniesService;
}
