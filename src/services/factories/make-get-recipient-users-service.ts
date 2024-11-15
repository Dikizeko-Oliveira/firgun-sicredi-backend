import { PrismaRecipientUsersRepository } from "../../repositories/prisma/prisma-recipient-users-repository";
import { GetRecipientUsersService } from "../recipient-users/get-recipient-users";

export function makeGetRecipientUsersService() {
  const prismaRecipientUsersRepository = new PrismaRecipientUsersRepository();
  const getRecipientUsersService = new GetRecipientUsersService(
    prismaRecipientUsersRepository
  );

  return getRecipientUsersService;
}
