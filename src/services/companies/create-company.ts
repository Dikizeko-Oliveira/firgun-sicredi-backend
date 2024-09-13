import { CompaniesRepository } from "@/repositories/companies-repository";
import { SlugAlreadyExistsError } from "../errors/slug-already-exists-error";

interface CreateCompanyRequest {
  name: string;
  email: string;
  in_charge: string;
  cellphone: string | null;
  slug: string;
}

export class CreateCompanyService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute({
    email,
    in_charge,
    name,
    slug,
    cellphone,
  }: CreateCompanyRequest) {
    const findCompany = await this.companiesRepository.findBySlug(slug);

    if (findCompany) {
      throw new SlugAlreadyExistsError();
    }

    const response = await this.companiesRepository.create({
      email,
      in_charge,
      name,
      slug,
      cellphone,
    });

    return response;
  }
}
