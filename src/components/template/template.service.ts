import { onMount } from "svelte";

import {
  TemplateRepositoryToken,
  type ITemplateRepository,
} from "@domain/template/template.repository";

import { inject } from "@hooks/inject";

import { filters, setTemplates, filteredTemplates } from "./template.store";

export const templateService = () => {
  const repository: ITemplateRepository = inject(TemplateRepositoryToken);

  let loaded: boolean = false;

  onMount(() => {
    if (!loaded) {
      load();
      loaded = true;
    }

    return repository.subscribe(load);
  });

  const load = async () => {
    const templates = await repository.all();
    setTemplates(templates);
  };

  const use = async (templateId: string) => {
    const template = await repository.get(templateId);

    navigator.clipboard.writeText(template.value);

    template.use();

    await repository.save(template);
  };
  const remove = async (templateId: string) => {
    await repository.delete(templateId);
  };
  return {
    templates: filteredTemplates,
    filters,
    use,
    remove,
  };
};
