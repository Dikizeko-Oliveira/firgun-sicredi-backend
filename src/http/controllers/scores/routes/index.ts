import { FastifyInstance } from "fastify";
import { createScoreController } from "../create-score.controller";
import { getScoreController } from "../get-score.controller";

export async function scoresRoutes(app: FastifyInstance) {
  // No Authenticated routes
  app.get("/scores/:id", getScoreController);
  app.post("/scores", createScoreController);
}
