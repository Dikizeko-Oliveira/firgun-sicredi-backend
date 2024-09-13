import { ResponsesRepository } from "@/repositories/responses-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

export class GetScoresToSendEmailsService {
  constructor(private responsesRepository: ResponsesRepository) {}

  async execute() {
    const findScoreResponse =
      await this.responsesRepository.getScoresToUpdate();

    if (!findScoreResponse) {
      throw new ResourceNotFoundError();
    }

    return findScoreResponse;
  }
}
