import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetCompanyService } from "@/services/factories/make-get-company-service";

export async function getCompanyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    slug: z.string(),
  });

  const { slug } = registerBodySchema.parse(request.query);

  try {
    const getCompaniesService = makeGetCompanyService();

    const response = await getCompaniesService.execute({
      slug,
    });

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
