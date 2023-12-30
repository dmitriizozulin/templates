<script lang="ts">
    import { spring } from "svelte/motion";

    import type { ITemplate } from "@domain/template/template.entity";

    export let template: ITemplate;

    let size = spring(100);
</script>

<div
    class="template"
    style={`scale: ${$size / 100}`}
    on:click
    on:mousedown={() => size.set(95)}
    on:mouseup={() => size.set(100)}
>
    <h4 class="name">{template.name}</h4>
    <p class="value">{template.value}</p>
</div>

<style>
    .template {
        display: flex;
        flex-direction: column;
        gap: 6px;

        cursor: pointer;
        user-select: none;

        border-radius: 12px;
        background-color: #ccc;
        color: #222;

        height: 100%;

        padding: 12px 16px;
    }

    .name {
        font-weight: 500;
    }

    .value {
        font-size: 0.9em;
        white-space: pre-wrap;
    }
</style>
