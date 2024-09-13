import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeGetScoreService } from "../../../services/factories/make-get-score-service";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

export async function getScoreController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = registerBodySchema.parse(request.params);

  try {
    const getScoreService = makeGetScoreService();

    const response = await getScoreService.execute({
      id,
    });

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message, status: 404 });
    }

    throw error;
  }
}
