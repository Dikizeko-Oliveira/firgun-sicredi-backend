import { PrismaCompaniesRepository } from "../../repositories/prisma/prisma-companies-repository";
import { CreateCompanyService } from "../companies/create-company";

export function makeCreateCompaniesService() {
  const prismaCompaniesRepository = new PrismaCompaniesRepository();
  const createCompaniesService = new CreateCompanyService(
    prismaCompaniesRepository
  );

  return createCompaniesService;
}
