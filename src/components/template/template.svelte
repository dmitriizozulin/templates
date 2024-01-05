<script lang="ts">
    import { flip } from "svelte/animate";
    import { derived } from "svelte/store";
    import { groupBy, orderBy } from "lodash";

    import { templateService } from "./template.service";

    import Template from "@components/template/template.view.svelte";

    const { templates, use } = templateService();

    const orderedByCreation = derived(templates, ($templates) =>
        orderBy($templates, "createdAt", "asc"),
    );

    const groupedByType = derived(orderedByCreation, ($orderedByCreation) =>
        groupBy($orderedByCreation, "type"),
    );
</script>

<div class="root">
    {#each Object.entries($groupedByType) as [type, templates] (type)}
        <h3 class="type">{type}</h3>
        <div class="templates">
            {#each templates as template (template.id)}
                <div animate:flip={{ duration: 200 }}>
                    <Template {template} on:click={() => use(template.id)} />
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .root {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .templates {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: 1fr;
        gap: 10px;
    }

    .type {
        font-weight: 500;
        word-wrap: break-word;
        color: #fff;
        max-width: 500px;
    }
</style>
