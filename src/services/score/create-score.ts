import { ResponsesRepository } from "@/repositories/responses-repository";
import { CompaniesRepository } from "@/repositories/companies-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { calculateAverage, daysUntil90, isOver90Days } from "@/utils/utils";
import { CpfAlreadyExistsError } from "../errors/cpf-already-exists-error";

interface CreateScoreRequest {
  cpf: string;
  slug: string;
  score: number;
}

export class CreateScoreService {
  constructor(
    private responsesRepository: ResponsesRepository,
    private companiesRepository: CompaniesRepository
  ) {}

  async execute({ cpf, slug, score }: CreateScoreRequest) {
    const findCompany = await this.companiesRepository.findBySlug(slug);

    if (!findCompany) {
      throw new ResourceNotFoundError();
    }

    const findCpf = await this.responsesRepository.findByCpf(cpf);

    if (findCpf && !daysUntil90(String(findCpf.created_at)).isOver90Days) {
      throw new CpfAlreadyExistsError(
        daysUntil90(String(findCpf.created_at)).daysRemaining.toString()
      );
    }

    const response = await this.responsesRepository.create({
      cpf,
      origin_name: slug,
      score,
      origin: findCompany.id,
      passed: score > 85 ? true : false,
      average: calculateAverage(score),
    });

    return response;
  }
}
