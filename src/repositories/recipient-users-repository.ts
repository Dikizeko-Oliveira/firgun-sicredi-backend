import { Prisma, RecipientUsers } from "@prisma/client";

export interface RecipientUsersRepository {
  create(
    data: Prisma.RecipientUsersUncheckedCreateInput
  ): Promise<RecipientUsers>;
  save(user: RecipientUsers): Promise<RecipientUsers>;
  listAll(): Promise<RecipientUsers[]>;
  findById(id: string): Promise<RecipientUsers | null>;
}
