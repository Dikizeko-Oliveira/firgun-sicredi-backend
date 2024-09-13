import { SendEmailService } from "../emails/send";

export function makeSendEmailService() {
  const sendEmailService = new SendEmailService();

  return sendEmailService;
}
