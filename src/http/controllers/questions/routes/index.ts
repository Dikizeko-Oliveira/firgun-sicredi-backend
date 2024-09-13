import { FastifyInstance } from "fastify";
import { createQuestionController } from "../create-question-controller";
import { getQuestionsController } from "../get-questions-controller";

export async function questionsRoutes(app: FastifyInstance) {
  // No Authenticated routes
  app.get("/questions", getQuestionsController);
  app.post("/questions", createQuestionController);
}
