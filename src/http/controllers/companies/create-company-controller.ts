import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error";
import { makeCreateCompaniesService } from "../../../services/factories/make-create-companies-service";

export async function createCompanyController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    in_charge: z.string(),
    slug: z.string(),
    cellphone: z.string().nullable(),
  });

  const { name, cellphone, email, in_charge, slug } = registerBodySchema.parse(
    request.body
  );

  try {
    const createCompanyService = makeCreateCompaniesService();

    await createCompanyService.execute({
      name,
      email,
      in_charge,
      slug,
      cellphone,
    });

    return reply.status(200).send({ message: "Success" });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
