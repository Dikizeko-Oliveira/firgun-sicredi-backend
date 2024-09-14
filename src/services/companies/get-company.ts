import { CompaniesRepository } from "@/repositories/companies-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetCompanyRequest {
  slug: string;
}

export class GetCompanyService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute({ slug }: GetCompanyRequest) {
    const findCompany = await this.companiesRepository.findBySlug(slug);

    if (findCompany) {
      throw new ResourceNotFoundError();
    }

    return findCompany;
  }
}
