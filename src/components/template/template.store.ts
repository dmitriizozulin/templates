import { derived, readonly, writable } from "svelte/store";

import type { ITemplate } from "@domain/template/template.entity";

export interface FilterParams {
    type?: string;
    value?: string;
}

const tempaltesStore = writable<ITemplate[]>([]);
const templateFilters = writable<FilterParams>({});

export const filters = readonly(templateFilters);
export const templates = readonly(tempaltesStore);

export const filteredTemplates = derived([tempaltesStore, filters], ([$tempaltesStore, $filters]) => {
    return $tempaltesStore.filter(template => {
        const typeFilter = $filters.type ? template.type === $filters.type : true;

        const value = $filters?.value?.toLowerCase()!;
        const valueFilter = $filters.value
            ? template.value.toLowerCase().includes(value) || template.name.toLowerCase().includes(value)
            : true;

        return typeFilter && valueFilter;
    });
});

export const setTemplates = (templates: ITemplate[]) => {
    tempaltesStore.set(templates);
};

export const addTemplate = (template: ITemplate) => {
    tempaltesStore.update(templates => templates.concat(template));
};

export const updateFilters = (params: FilterParams) => {
    templateFilters.update(filters => ({
        ...filters,
        ...params,
    }));
};