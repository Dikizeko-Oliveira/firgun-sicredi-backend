import schedule from "node-schedule";
import path from "path";
import { format } from "date-fns";

import { makeSendEmailService } from "@/services/factories/make-send-email-service";
import { makeGetCompaniesService } from "@/services/factories/make-get-companies-service";
import { extractData, extractIdsToUpdate, generateXlsx } from "@/utils/utils";
import { makeUpdateScoreService } from "@/services/factories/make-update-score-service";

async function sendScoresEmails(): Promise<void> {
  const template_mail = path.resolve(
    __dirname,
    "..",
    "..",
    "emails",
    "views",
    "template.hbs"
  );

  const template_empty_mail = path.resolve(
    __dirname,
    "..",
    "..",
    "emails",
    "views",
    "template-empty.hbs"
  );

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
          subject: `Resultado dos scores - ${format(new Date(), "dd/MM/yyyy")}`,
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

        console.log(
          `Email enviado para ${company.in_charge} - ${company.name}`
        );

        const ids = extractIdsToUpdate({ array: company.Responses });
        scoresIdsToUpdate.push(...ids);
      } else {
        await sendEmailService.execute({
          subject: `Resultado dos scores - ${format(new Date(), "dd/MM/yyyy")}`,
          to: {
            email: company.email,
            name: company.name,
          },
          templateData: {
            file: template_empty_mail,
            variables: {
              name: company.in_charge,
              date: format(new Date(), "dd/MM/yyyy - HH:mm"),
            },
          },
        });

        console.log(
          `Email enviado para ${company.in_charge} - ${company.name}`
        );
      }
    }
  })();

  await (async () => {
    for (const scoreId of scoresIdsToUpdate) {
      if (scoreId)
        await updateScoreService.execute({ id: scoreId, already_sent: true });
    }
  })();
}
// 0 7 * * * => 7h todos os dias // Mudando para 10 devido ao fuso da máquina na AWS
const job = schedule.scheduleJob("0 10 * * *", async () => {
  console.log("Iniciando envio de emails de scores às 7h...");
  await sendScoresEmails();
  console.log("Envio de emails de score finalizado.");
});
