import { FastifyInstance } from "fastify";
import { createCompanyController } from "../create-company-controller";
import { getCompaniesController } from "../get-companies-controller";
import { listCompaniesController } from "../list-companies-controller";
import { checkCompaniesController } from "../check-companies-controller";
import { getCompanyController } from "../get-company-controller";

export async function companiesRoutes(app: FastifyInstance) {
  // No Authenticated routes
  app.get("/check-company", checkCompaniesController);
  app.get("/companies", getCompaniesController);
  app.get("/list-companies", listCompaniesController);
  app.get("/company", getCompanyController);
  app.post("/companies", createCompanyController);
}
