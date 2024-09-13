export class CpfAlreadyExistsError extends Error {
  daysRemaining: string;

  constructor(missingDays: string) {
    super("CPF already responded");
    this.daysRemaining = missingDays;
  }

  getDaysRemaining(): string {
    return this.daysRemaining;
  }
}
