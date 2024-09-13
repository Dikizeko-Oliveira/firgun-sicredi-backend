import { FastifyInstance } from "fastify";
import { sendEmailController } from "../send-controller";

export async function emailsRoutes(app: FastifyInstance) {
  // No Authenticated routes
  app.post("/send-email", sendEmailController);
}
