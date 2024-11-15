import { PrismaRecipientUsersRepository } from "../../repositories/prisma/prisma-recipient-users-repository";
import { CreateRecipientUserService } from "../recipient-users/create-recipient-user";

export function makeCreateRecipientUserService() {
  const prismaRecipientUsersRepository = new PrismaRecipientUsersRepository();
  const createRecipientUsersService = new CreateRecipientUserService(
    prismaRecipientUsersRepository
  );

  return createRecipientUsersService;
}
