
import { restoreTemplate, type ITemplate } from "./template.entity";
import { LocalStorageRepository } from "@infrastructure/repository/local-storage.repository";

export class ITemplateRepository extends LocalStorageRepository<ITemplate> {}

export const TemplateRepositoryToken = Symbol('TemplateRepositoryToken');
export const createTemplateRepository = () => new ITemplateRepository("templates", restoreTemplate);