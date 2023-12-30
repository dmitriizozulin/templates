<script lang="ts">
    import {
        TemplateRepositoryToken,
        type ITemplateRepository,
    } from "@domain/template/template.repository";

    import { inject } from "@hooks/inject";
    import { first } from "lodash";

    const repository: ITemplateRepository = inject(TemplateRepositoryToken);

    let files: FileList;

    $: if (files) {
        const reader = new FileReader();

        reader.readAsText(first(files)!);

        reader.addEventListener("load", (event) => {
            if (event.target?.result) {
                loadFromFile(event.target.result as string);
            }
        });
    }

    const saveToFile = () => {
        const data = repository.getRawData();

        const file = new Blob([data], { type: "text/json" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = "data.json";

        link.click();
        URL.revokeObjectURL(link.href);
    };

    const loadFromFile = (data: string) => {
        repository.loadRaw(data);
    };
</script>

<div>
    <button>
        <label for="file">Загрузить из файла</label>
    </button>

    <input id="file" class="file" type="file" accept=".json, .txt" bind:files />

    <button on:click={saveToFile}>Сохранить в файл</button>
</div>

<style>
    .file {
        visibility: hidden;
        position: absolute;
        user-select: none;
    }

    label {
        cursor: pointer;
    }
</style>
