import { Prisma, Companies } from "@prisma/client";

interface ListType {
  id: string;
  slug: string;
  name: string;
}

interface ResponseProps {
  id: string;
  cpf: string;
  origin: string;
  origin_name: string;
  average: string;
  passed: boolean;
  already_sent: boolean;
  score: number;
  created_at: Date;
}

interface RecipientUserProps {
  id: string;
  name: string;
  email: string;
  origin: string;
  origin_name: string;
  created_at: Date;
}

export interface CompsType {
  id?: string;
  name: string;
  email: string;
  in_charge: string;
  cellphone?: string | null;
  slug: string;
  created_at?: Date | string;
  Responses: ResponseProps[];
  RecipientUsers: RecipientUserProps[];
}
export interface CompaniesRepository {
  create(data: Prisma.CompaniesCreateInput): Promise<Companies>;
  save(user: Companies): Promise<Companies>;
  findById(id: string): Promise<Companies | null>;
  findBySlug(slug: string): Promise<Companies | null>;
  listAll(): Promise<CompsType[]>;
  list(): Promise<ListType[]>;
}
