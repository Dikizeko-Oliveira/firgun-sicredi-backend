import { PrismaCompaniesRepository } from "../../repositories/prisma/prisma-companies-repository";
import { CheckCompaniesService } from "../companies/check-companies";

export function makeCheckCompaniesService() {
  const prismaCompaniesRepository = new PrismaCompaniesRepository();
  const checkCompaniesService = new CheckCompaniesService(
    prismaCompaniesRepository
  );

  return checkCompaniesService;
}
