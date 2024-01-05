import { type ITemplate } from "@domain/template/template.entity";
import { TemplateRepositoryToken } from "@domain/template/template.repository";

import { templateService } from "@components/template/template.service";

import { inject } from "@hooks/inject";

export const templateCreatorService = () => {
    templateService();
    
    const repository = inject(TemplateRepositoryToken);

    const save = async (template: ITemplate): Promise<void> => {
        await repository.save(template);
    };

    return {
        save,
    };
};