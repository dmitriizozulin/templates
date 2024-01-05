
import type { Token } from "@hooks/introduceDependency";

import { LocalStorageRepository } from "@infrastructure/repository/local-storage.repository";

import { restoreTemplate, type ITemplate } from "./template.entity";

export class ITemplateRepository extends LocalStorageRepository<ITemplate> {}

const TemplateRepositorySymbol = Symbol('TemplateRepositoryToken');
export const TemplateRepositoryToken: Token<ITemplateRepository> = {
    token: TemplateRepositorySymbol,
};

export const createTemplateRepository = () => new ITemplateRepository("templates", restoreTemplate);