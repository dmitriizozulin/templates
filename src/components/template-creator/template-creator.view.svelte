<script lang="ts">
    import { derived } from "svelte/store";
    import { uniq } from "lodash";

    import { templates } from "@components/template/template.store";

    import { createTemplate } from "@domain/template/template.entity";

    import { templateCreatorService } from "./template-creator.service";

    type UpdaterType = "name" | "type" | "value";

    const { save } = templateCreatorService();

    const typeOptions = derived(templates, ($templates) =>
        uniq($templates.map((it) => it.type)),
    );

    let template = createTemplate({ name: "", type: "", value: "" });

    $: isValid = template.validate();

    const updaterFrom: Record<UpdaterType, (value: string) => void> = {
        name: (name) => template.updateName(name),
        type: (type) => template.updateType(type),
        value: (value) => template.updateValue(value),
    };

    const getHandler = (updaterType: UpdaterType) => (event: Event) => {
        const input = event.target as HTMLInputElement;

        const updater = updaterFrom[updaterType];

        updater(input.value);
        template = template;
    };

    const onCreate = () => {
        if (isValid) {
            save(template);
            template = createTemplate({ name: "", type: "", value: "" });
        }
    };
</script>

<div class="template">
    <h2>Добавить шаблон</h2>

    <div class="info">
        <input
            type="text"
            placeholder="Название"
            value={template.name}
            on:input={getHandler("name")}
        />

        <input
            type="text" 
            placeholder="Категория"
            list="type-options"
            value={template.type}
            on:input={getHandler("type")}
        />
        <datalist id="type-options">
            {#each $typeOptions as type (type)}
                <option value={type}></option>
            {/each}
        </datalist>
    </div>

    <textarea
        class="template_text"
        placeholder="Текст"
        value={template.value}
        on:input={getHandler("value")}
    ></textarea>

    <button class="template_button" disabled={!isValid} on:click={onCreate}>
        Создать
    </button>
</div>

<style>
    .template {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        row-gap: 12px;
        border-radius: 8px;
        background: rgb(35, 12, 52);
        background: linear-gradient(
            90deg,
            rgba(35, 12, 52, 1) 0%,
            rgba(90, 73, 102, 1) 50%,
            rgba(35, 12, 52, 1) 100%
        );
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
        background: rgb(35, 12, 52);
        background: linear-gradient(
            90deg,
            rgba(35, 12, 52, 1) 0%,
            rgba(90, 73, 102, 1) 50%,
            rgba(35, 12, 52, 1) 100%
        );
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
