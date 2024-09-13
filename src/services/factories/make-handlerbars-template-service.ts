import { HandlebarsMailTemplateProvider } from "../emails/providers/implementations/handlerbars-template";

export function makeHandlerbarsTemplateService() {
  const mailTemplate = new HandlebarsMailTemplateProvider();

  return mailTemplate;
}
