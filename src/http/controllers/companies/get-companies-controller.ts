import { FastifyRequest, FastifyReply } from "fastify";

import { makeGetCompaniesService } from "../../../services/factories/make-get-companies-service";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

export async function getCompaniesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getCompaniesService = makeGetCompaniesService();

    const response = await getCompaniesService.execute();

    return reply.status(200).send(response);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
