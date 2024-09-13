import Mailjet from "node-mailjet";
import path from "path";
import fs from "node:fs";

import ISendMailDTO from "./providers/subject-provider";
import { makeHandlerbarsTemplateService } from "../factories/make-handlerbars-template-service";

export class SendEmailService {
  private mailjet: any;

  constructor() {
    this.mailjet = new Mailjet.Client({
      apiKey: process.env.MJ_APIKEY_PUBLIC,
      apiSecret: process.env.MJ_APIKEY_PRIVATE,
    });
  }

  async execute({ subject, templateData, to, from, filePath }: ISendMailDTO) {
    const handlerbarsTemplate = makeHandlerbarsTemplateService();
    const template = await handlerbarsTemplate.parse(templateData);

    const attachmentContent = fs.readFileSync(filePath).toString("base64");
    const fileName = path.basename(filePath);

    await this.mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: from?.email || (process.env.EMAIL_ADDRESS as string),
            Name: from?.name || (process.env.NAME_ADDRESS as string),
          },
          To: [
            {
              Email: to.email,
              Name: to.name,
            },
          ],
          Subject: subject,
          TemplateLanguage: true,
          HTMLPart: template,
          Attachments: [
            {
              ContentType:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              Filename: fileName,
              Base64Content: attachmentContent,
            },
          ],
        },
      ],
    });

    fs.unlinkSync(filePath);
  }
}
