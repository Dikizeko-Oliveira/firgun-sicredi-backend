import fastify from 'fastify'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import 'module-alias/register'

import "./services/jobs/emails/send-scores";
import { env } from './env'
import { questionsRoutes } from './http/controllers/questions/routes'
import { companiesRoutes } from './http/controllers/companies/routes'
import { scoresRoutes } from './http/controllers/scores/routes'
import { emailsRoutes } from './http/controllers/emails/routes'

export const app = fastify()

const allowedDomains = [
  'https://sicredi.firgun.com.br/',
  'https://www.sicredi.firgun.com.br/',
]

app.register(cors, {
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true)
    if (allowedDomains.indexOf(origin) === -1) {
      const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
})
app.register(questionsRoutes)
app.register(companiesRoutes)
app.register(scoresRoutes)
app.register(emailsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
