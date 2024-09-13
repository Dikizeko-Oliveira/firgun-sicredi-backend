import { FastifyRequest, FastifyReply } from "fastify";

import { ResourceNotFoundError } from "../../../services/errors/resource-not-found-error";
import { makeGetQuestionsService } from "../../../services/factories/make-get-questions-service";

export async function getQuestionsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getQuestionsService = makeGetQuestionsService();

    const questions = await getQuestionsService.execute();

    return reply.status(200).send(questions);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
