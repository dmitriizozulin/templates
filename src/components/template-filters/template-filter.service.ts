
import { updateFilters, type FilterParams } from "@components/template/template.store";
import { templateService } from "@components/template/template.service";


export const templateFiltersService = () => {
    templateService();

    const filter = (params: FilterParams) => {
        updateFilters({
            type: params.type || undefined,
            value: params.value || undefined,
        });
    };

    return {
        filter,
    };
};