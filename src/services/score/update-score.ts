import { ResponsesRepository } from "@/repositories/responses-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdatecoreRequest {
  id: string;
  already_sent: boolean;
}

export class UpdateScoreService {
  constructor(private responsesRepository: ResponsesRepository) {}

  async execute({ id, already_sent }: UpdatecoreRequest) {
    const findScoreResponse = await this.responsesRepository.findById(id);

    if (!findScoreResponse) {
      throw new ResourceNotFoundError();
    }
    findScoreResponse.already_sent = already_sent;

    await this.responsesRepository.save(findScoreResponse);
  }
}
