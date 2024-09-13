import handlebars from "handlebars";
import fs from "fs";

import { IParseMailTemplate } from "../template-provider";

export class HandlebarsMailTemplateProvider {
  constructor() {}

  async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
