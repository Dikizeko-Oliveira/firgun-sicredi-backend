import { PrismaCompaniesRepository } from "../../repositories/prisma/prisma-companies-repository";
import { GetCompanyService } from "../companies/get-company";

export function makeGetCompanyService() {
  const prismaCompaniesRepository = new PrismaCompaniesRepository();
  const getCompanyService = new GetCompanyService(prismaCompaniesRepository);

  return getCompanyService;
}
