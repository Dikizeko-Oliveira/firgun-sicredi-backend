import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeCreateScoreService } from "../../../services/factories/make-create-score-service";
import { CpfAlreadyExistsError } from "@/services/errors/cpf-already-exists-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

export async function createScoreController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    cpf: z.string(),
    score: z.number(),
    slug: z.string(),
  });

  const { cpf, score, slug } = registerBodySchema.parse(request.body);

  try {
    const createScoreService = makeCreateScoreService();

    await createScoreService.execute({
      cpf,
      score,
      slug,
    });

    return reply.status(200).send({ message: "Success" });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message, status: 404 });
    }
    if (error instanceof CpfAlreadyExistsError) {
      return reply.status(401).send({
        message: error.message,
        status: 401,
        remaining_days: error?.getDaysRemaining(),
      });
    }

    throw error;
  }
}
