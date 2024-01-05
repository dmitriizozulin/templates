<script lang="ts">
    import { derived } from "svelte/store";
    import { isEmpty, uniq } from "lodash";

    import { templates } from "@components/template/template.store";

    import { templateCreatorService } from "./template-creator.service";

    const { create } = templateCreatorService();

    const typeOptions = derived(templates, ($templates) =>
        uniq($templates.map((it) => it.type)),
    );

    let name: string = "";
    let type: string = "";
    let value: string = "";

    $: isValid = [name, type, value].every((it) => !isEmpty(it));

    const onCreate = () => {
        if (isValid) {
            create({ name, type, value });
            name = "";
            type = "";
            value = "";
        }
    };
</script>

<div class="template">
    <h2>Добавить шаблон</h2>

    <div class="info">
        <input type="text" placeholder="Название" bind:value={name} />

        <input
            type="text"
            placeholder="Категория"
            list="type-options"
            bind:value={type}
        />
        <datalist id="type-options">
            {#each $typeOptions as type (type)}
                <option value={type} />
            {/each}
        </datalist>
    </div>

    <textarea class="template_text" placeholder="Текст" bind:value />

    <button class="template_button" disabled={!isValid} on:click={onCreate}>Создать</button>
</div>

<style>
    .template {
            display: flex;
            flex-direction: column;
            max-width: 500px;
            row-gap: 12px;
            border-radius: 8px;
            background: rgb(35,12,52);
        background: linear-gradient(90deg, rgba(35,12,52,1) 0%, rgba(90,73,102,1) 50%, rgba(35,12,52,1) 100%);
            color: #fff;
            border: 2px solid #fff;
            padding: 12px;
    }

    input {
        width: 100%;
    }

    button {
        width: max-content;
    }
    .template_button {
        background: rgb(35,12,52);
        background: linear-gradient(90deg, rgba(35,12,52,1) 0%, rgba(90,73,102,1) 50%, rgba(35,12,52,1) 100%);
        color: #fff;
        border: 2px solid #fff;

    }

    .info {
        display: flex;
        column-gap: 8px;
        flex-basis: 50%;
    }

    .template_text {
        max-width: 500px;
        min-height: 100px;
    }
</style>
