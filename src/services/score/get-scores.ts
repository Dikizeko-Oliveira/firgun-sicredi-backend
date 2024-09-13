import { ResponsesRepository } from "@/repositories/responses-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetScoresRequest {
  id: string;
}

export class GetScoresService {
  constructor(private responsesRepository: ResponsesRepository) {}

  async execute({ id }: GetScoresRequest) {
    const findScoreResponse =
      await this.responsesRepository.getScoresToUpdate();

    if (!findScoreResponse) {
      throw new ResourceNotFoundError();
    }

    return findScoreResponse;
  }
}
