<script lang="ts">
    import TemplateCreator from "@components/template-creator/template-creator.view.svelte";
    import TemplateFilters from "@components/template-filters/template-filters.view.svelte";
    import TemplatesTop from "@components/template-top/template-top.view.svelte";
    import Templates from "@components/template/template.svelte";
</script>

<section class="root">
    <main class="templates">
        <header>
            <TemplateCreator />
        </header>
        <TemplateFilters />
        <Templates />
    </main>
    <aside class="top">
        <TemplatesTop />
    </aside>
</section>

<style>
    .root {
        display: flex;
        column-gap: 60px;

        padding: 24px;
    }

    .templates {
        display: flex;
        flex-direction: column;
        row-gap: 24px;

        max-width: 1000px;

        padding: 0;
    }

    .top {
        max-width: 500px;
    }
</style>
