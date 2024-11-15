import { RecipientUsers } from "@prisma/client";
import { RecipientUsersRepository } from "@/repositories/recipient-users-repository";

export class GetRecipientUsersService {
  constructor(private recipientUsersRepository: RecipientUsersRepository) {}

  async execute(): Promise<RecipientUsers[]> {
    const recipientUsers = await this.recipientUsersRepository.listAll();

    return recipientUsers;
  }
}
