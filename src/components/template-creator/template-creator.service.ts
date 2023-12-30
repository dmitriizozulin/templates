import { createTemplate } from "@domain/template/template.entity";
import { ITemplateRepository, TemplateRepositoryToken } from "@domain/template/template.repository";

import { templateService } from "@components/template/template.service";

import { inject } from "@hooks/inject";

interface CreationParams {
    name: string;
    type: string;
    value: string;
}

export const templateCreatorService = () => {
    templateService();
    
    const repository: ITemplateRepository = inject(TemplateRepositoryToken);

    const create = async (params: CreationParams): Promise<void> => {
        const template = createTemplate(params);
        await repository.save(template);
    };

    return {
        create,
    };
};