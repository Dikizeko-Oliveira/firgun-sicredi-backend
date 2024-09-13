interface ITemplateVariables {
  [key: string]: string | number | Array<any>;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

export interface IMailTemplateProvider {
  parse(data: IParseMailTemplate): Promise<string>;
}
