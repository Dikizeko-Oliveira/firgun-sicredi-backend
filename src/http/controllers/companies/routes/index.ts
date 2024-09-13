import { FastifyInstance } from "fastify";
import { createCompanyController } from "../create-company-controller";
import { getCompaniesController } from "../get-companies-controller";
import { checkCompaniesController } from "../check-companies-controller";

export async function companiesRoutes(app: FastifyInstance) {
  // No Authenticated routes
  app.get("/check-company", checkCompaniesController);
  app.get("/companies", getCompaniesController);
  app.post("/companies", createCompanyController);
}
