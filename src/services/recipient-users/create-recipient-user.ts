import { RecipientUsersRepository } from "@/repositories/recipient-users-repository";

interface CreateRecipientRequest {
  name: string;
  email: string;
  origin: string;
  origin_name: string;
}

export class CreateRecipientUserService {
  constructor(private recipientUsersRepository: RecipientUsersRepository) {}

  async execute({ name, email, origin, origin_name }: CreateRecipientRequest) {
    const user = await this.recipientUsersRepository.create({
      name,
      email,
      origin_name,
      origin,
    });

    return user;
  }
}
