import { FastifyRequest, FastifyReply } from "fastify";
import path from "path";

import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error";
import { makeSendEmailService } from "@/services/factories/make-send-email-service";
import { makeGetCompaniesService } from "@/services/factories/make-get-companies-service";
import { extractData, extractIdsToUpdate, generateXlsx } from "@/utils/utils";
import { format } from "date-fns";
import { makeUpdateScoreService } from "@/services/factories/make-update-score-service";

export async function sendEmailController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const template_mail = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "services",
    "emails",
    "views",
    "template.hbs"
  );

  try {
    const getCompaniesService = makeGetCompaniesService();
    const updateScoreService = makeUpdateScoreService();

    const companies = await getCompaniesService.execute();
    const sendEmailService = makeSendEmailService();

    let scoresIdsToUpdate: string[] = [];

    await (async () => {
      for (const company of companies) {
        if (
          company.Responses.filter((items) => items.already_sent === false)
            .length > 0
        ) {
          await sendEmailService.execute({
            subject: "Teste E-mail",
            to: {
              email: company.email,
              name: company.name,
            },
            templateData: {
              file: template_mail,
              variables: {
                name: company.in_charge,
                date: format(new Date(), "dd/MM/yyyy - HH:mm"),
              },
            },
            filePath: generateXlsx(
              extractData({ array: company.Responses }),
              "scores"
            ),
          });

          const ids = extractIdsToUpdate({ array: company.Responses });
          scoresIdsToUpdate.push(...ids);
        }
      }
    })();

    await (async () => {
      for (const scoreId of scoresIdsToUpdate) {
        if (scoreId)
          await updateScoreService.execute({ id: scoreId, already_sent: true });
      }
    })();

    return reply.status(200).send({ message: "Success" });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
