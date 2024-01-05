<script lang="ts">
    import {
        TemplateRepositoryToken,
        type ITemplateRepository,
    } from "@domain/template/template.repository";

    import { inject } from "@hooks/inject";
    import { first } from "lodash";

    const repository = inject(TemplateRepositoryToken);

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
    <button class="file_style">
        <label for="file">Загрузить из файла</label>
    </button>

    <input id="file" class="file" type="file" accept=".json, .txt" bind:files />

    <button class="file_style" on:click={saveToFile}>Сохранить в файл</button>
</div>

<style>
    .file {
        visibility: hidden;
        position: absolute;
        user-select: none;
    }
    .file_style {
        border: 2px solid #fff;
        background: rgb(35, 12, 52);
        background: linear-gradient(
            90deg,
            rgba(35, 12, 52, 1) 0%,
            rgba(90, 73, 102, 1) 50%,
            rgba(35, 12, 52, 1) 100%
        );
        color: #fff;
    }
    label {
        cursor: pointer;
    }
</style>
