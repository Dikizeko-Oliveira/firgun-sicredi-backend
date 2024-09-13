import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeCheckCompaniesService } from "../../../services/factories/make-check-companies-service";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

export async function checkCompaniesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerBodySchema = z.object({
      slug: z.string(),
    });

    const { slug } = registerBodySchema.parse(request.query);

    const listCompaniesService = makeCheckCompaniesService();

    const response = await listCompaniesService.execute({ slug });

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
