export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() {
    /**
     *  DI - Dependency Injection
     */
  }

  execute({ base, limit = 10 }: CreateTableOptions) {
    const HEADERMESSAGE = `
      ===============================
            Tabla del ${base}
      =============================== \n`;

    let outputMessage = "";

    for (let i = 1; i <= limit; i++) {
      outputMessage += `${base} x ${i} = ${i * base}`;
      if (i < limit) outputMessage += "\n";
    }

    return HEADERMESSAGE + outputMessage;
  }
}
