import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error";
import { makeCreateQuestionService } from "../../../services/factories/make-create-question-service";

export async function createQuestionController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    type: z.string(),
    screen: z.number(),
  });

  const { name, screen, type } = registerBodySchema.parse(request.body);

  try {
    const createQuestionService = makeCreateQuestionService();

    await createQuestionService.execute({ name, type, screen });

    return reply.status(200).send({ message: "Success" });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
