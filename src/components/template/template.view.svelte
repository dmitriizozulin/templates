<script lang="ts">
    import { spring } from "svelte/motion";

    import type { ITemplate } from "@domain/template/template.entity";
    import { templateService } from "./template.service";

    export let template: ITemplate;

    let size = spring(100);

    const { remove } = templateService();
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
    <div class="btn_wrapper">
        <button
            class="btn"
            on:click|stopPropagation={() => remove(template.id)}
        >
            Удалить</button
        >
    </div>
</div>

<style>
    .template {
        display: flex;
        flex-direction: column;
        gap: 6px;
        cursor: pointer;
        user-select: none;

        border-radius: 12px;
        background-color: #e9d3f6;
        color: #6e6871;

        max-width: 500px;
        height: 100%;

        padding: 12px 16px;
    }

    .name {
        font-weight: 600;

        word-wrap: break-word;
        color: #6e6871;
    }

    .value {
        font-size: 0.9em;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .btn_wrapper {
        display: flex;
        justify-content: end;
        margin-top: auto;
    }

    .btn {
        text-decoration: none;
        background: rgb(35, 12, 52);
        background: linear-gradient(
            90deg,
            rgba(35, 12, 52, 1) 0%,
            rgba(20, 13, 25, 1) 24%,
            rgba(20, 13, 25, 1) 76%,
            rgba(35, 12, 52, 1) 100%
        );
        color: #fff;
        display: inline-block;
        padding: 14px 30px;
        position: relative;
        z-index: 0;
        border: 4px solid #fff;
        border-radius: 5px;
        box-sizing: border-box;
        outline: none;
        cursor: pointer;
        user-select: none;
        appearance: none;
        touch-action: manipulation;
    }
    .btn:before {
        content: "";
        position: absolute;
        left: -2px;
        top: -2px;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        background: rgb(35, 12, 52);
        background: linear-gradient(
            90deg,
            rgba(35, 12, 52, 1) 0%,
            rgba(20, 13, 25, 1) 24%,
            rgba(20, 13, 25, 1) 76%,
            rgba(35, 12, 52, 1) 100%
        );
        z-index: -2;
        transition: 0.4s;
        border-radius: 5px;
    }
    .btn:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgb(35, 12, 52);
        background: linear-gradient(
            90deg,
            rgba(35, 12, 52, 1) 0%,
            rgba(20, 13, 25, 1) 24%,
            rgba(20, 13, 25, 1) 76%,
            rgba(35, 12, 52, 1) 100%
        );
        z-index: -1;
        transition: 0.4s;
        border-radius: 4px;
    }
    .btn:hover {
        color: #e97272;
        transition: 0.3s;
    }
    .btn:hover:after {
        background: rgb(35, 12, 52);
        background: linear-gradient(
            90deg,
            rgba(35, 12, 52, 1) 0%,
            rgba(20, 13, 25, 1) 24%,
            rgba(20, 13, 25, 1) 76%,
            rgba(35, 12, 52, 1) 100%
        );
    }
    .btn:active:after {
        background: rgb(35, 12, 52);
        background: linear-gradient(
            90deg,
            rgba(35, 12, 52, 1) 0%,
            rgba(20, 13, 25, 1) 24%,
            rgba(20, 13, 25, 1) 76%,
            rgba(35, 12, 52, 1) 100%
        );
    }
    .btn:focus-visible {
        box-shadow: 0 0 0 3px rgba(35, 12, 52, 1) 100%;
    }
    .btn:disabled {
        pointer-events: none;
    }
    .btn:disabled:before {
        filter: grayscale(100%);
    }
</style>
