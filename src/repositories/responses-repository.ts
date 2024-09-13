import { Prisma, Responses } from "@prisma/client";

export interface ResponsesRepository {
  create(data: Prisma.ResponsesUncheckedCreateInput): Promise<Responses>;
  save(user: Responses): Promise<Responses>;
  findById(id: string): Promise<Responses | null>;
  getScoresToUpdate(): Promise<Responses[]>;
  findByCpf(cpf: string): Promise<Responses | null>;
}
