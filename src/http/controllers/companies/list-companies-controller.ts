import { FastifyRequest, FastifyReply } from 'fastify'

import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'
import { makeListCompaniesService } from '@/services/factories/make-list-companies-service'

export async function listCompaniesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getCompaniesService = makeListCompaniesService()

    const response = await getCompaniesService.execute()

    return reply.status(200).send(response)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
