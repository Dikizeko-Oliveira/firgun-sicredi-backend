import { CompaniesRepository } from "@/repositories/companies-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class CheckCompaniesService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute({ slug }: { slug: string }) {
    const findCompany = await this.companiesRepository.findBySlug(slug);

    if (!findCompany) {
      return null;
    }

    return findCompany;
  }
}
