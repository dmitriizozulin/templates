<script lang="ts">
    import { derived } from "svelte/store";
    import { flip } from "svelte/animate";
    import { orderBy, take } from "lodash";

    import { templates } from "@components/template/template.store";
    import { templateService } from "@components/template/template.service";

    import Template from "@components/template/template.view.svelte";

    const { use } = templateService();

    const topTemplates = derived(templates, ($templates) => {
        return take(orderBy($templates, "usedCount", "desc"), 10);
    });
</script>

<div class="templates">
    <h2 class="templates_style">Часто используемые</h2>
    {#each $topTemplates as template (template.id)}
        <div animate:flip={{ duration: 200 }}>
            <Template {template} on:click={() => use(template.id)} />
        </div>
    {/each}
</div>

<style>
    .templates {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .templates_style {
        color: #fff;
    }
</style>
