import { Prisma, Questions } from "@prisma/client";

export interface QuestionsRepository {
  create(data: Prisma.QuestionsCreateInput): Promise<Questions>;
  save(user: Questions): Promise<Questions>;
  listAll(): Promise<Questions[]>;
}
