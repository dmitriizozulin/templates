<script lang="ts">
    import { derived } from "svelte/store";
    import { uniq } from "lodash";

    import { templates } from "@components/template/template.store";

    import { templateFiltersService } from "./template-filter.service";

    const { filter } = templateFiltersService();

    let type: string = "";
    let value: string = "";

    const typeOptions = derived(templates, ($templates) =>
        uniq($templates.map((it) => it.type)),
    );

    $: {
        filter({ type, value });
    }
</script>

<div class="root">
    <h2>Фильтры</h2>

    <div class="filters">
        <input type="text" placeholder="Текст" bind:value />

        <select name="type" bind:value={type}>
            <option value="">Категория</option>
            {#each $typeOptions as type (type)}
                <option value={type}>{type}</option>
            {/each}
        </select>
    </div>
</div>

<style>
    .root {
        display: flex;
        flex-direction: column;
        row-gap: 12px;

        border-radius: 8px;
        background-color: #d4d4d4;
        color: #222;

        max-width: 500px;

        padding: 12px;
        margin-top: 4px;
    }

    .filters {
        max-width: 500px;
        display: grid;
        grid-template-columns: 3fr 1fr;
        column-gap: 8px;
    }
</style>
