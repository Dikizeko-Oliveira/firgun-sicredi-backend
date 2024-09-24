import { CompaniesRepository } from "@/repositories/companies-repository";

export class ListCompaniesService {
  constructor(private companiesRepository: CompaniesRepository) { }

  async execute() {
    const findCompanies = await this.companiesRepository.list();

    return findCompanies;
  }
}
