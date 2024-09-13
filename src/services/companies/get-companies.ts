import { CompaniesRepository } from "@/repositories/companies-repository";

export class GetCompaniesService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute() {
    const findCompanies = await this.companiesRepository.listAll();

    return findCompanies;
  }
}
