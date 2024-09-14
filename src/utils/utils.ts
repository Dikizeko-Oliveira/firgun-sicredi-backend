import { format } from "date-fns";
import path from "path";
import XLSX from "xlsx";

export function calculateAverage(media: number) {
  if (media >= 95.67 && media <= 107.5) {
    return "A+";
  } else if (media >= 85.34 && media < 95.67) {
    return "A";
  } else if (media >= 75.01 && media < 85.34) {
    return "A-";
  } else if (media >= 64.68 && media < 75.01) {
    return "B+";
  } else if (media >= 54.35 && media < 64.68) {
    return "B";
  } else if (media >= 44.02 && media < 54.35) {
    return "B-";
  } else if (media >= 33.69 && media < 44.02) {
    return "C+";
  } else if (media >= 23.36 && media < 33.69) {
    return "C";
  } else if (media >= 13.03 && media < 23.36) {
    return "C-";
  } else if (media >= -17.96 && media < 13.03) {
    return "D";
  } else if (media >= -167.5 && media < -17.96) {
    return "E";
  } else {
    return "Inválido";
  }
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

interface XlsxDataProps {
  CPF: string;
  NOTA: string;
  DATA: string;
}

export function extractData({
  array,
}: {
  array: ResponseProps[];
}): XlsxDataProps[] {
  return array
    .filter((res) => res.already_sent === false)
    .map((item) => ({
      CPF: item.cpf,
      NOTA: item.average,
      DATA: format(item.created_at, "dd/MM/yyyy - HH:mm"),
    }));
}

export function extractIdsToUpdate({
  array,
}: {
  array: ResponseProps[];
}): string[] {
  return array
    .filter((res) => res.already_sent === false)
    .map((item) => item.id);
}

export function generateXlsx(data: XlsxDataProps[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  const filePath = path.join(
    __dirname,
    `${filename}-${format(new Date(), "dd-MM-yyyy")}.xlsx`
  );
  XLSX.writeFile(wb, filePath);
  return filePath;
}

interface Over90DaysProps {
  isOver90Days: boolean;
  missing_days: string;
}

export function isOver90Days(dateString: string): Over90DaysProps {
  const inputDate = new Date(dateString);

  const currentDate = new Date();

  if (isNaN(inputDate.getTime())) {
    throw new Error("Data inválida fornecida");
  }

  const diffInMs = currentDate.getTime() - inputDate.getTime();

  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  // Retornar true se a diferença for maior ou igual a 90 dias
  return {
    isOver90Days: diffInDays >= 90,
    missing_days: diffInDays.toString(),
  };
}

export function daysUntil90(dateString: string): {
  isOver90Days: boolean;
  daysRemaining: number;
} {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  // Verifica se a data de entrada é inválida
  if (isNaN(inputDate.getTime())) {
    throw new Error("Data inválida fornecida");
  }

  // Calcula a diferença em milissegundos
  const diffInMs = currentDate.getTime() - inputDate.getTime();

  // Converte a diferença de milissegundos para dias
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  // Calcula o número de dias restantes para completar 90 dias
  const daysRemaining = 90 - diffInDays;

  // Retorna se já se passaram 90 dias e quantos dias faltam (ou quantos dias excederam)
  return {
    isOver90Days: diffInDays >= 90,
    daysRemaining: daysRemaining > 0 ? Math.ceil(daysRemaining) : 0,
  };
}
