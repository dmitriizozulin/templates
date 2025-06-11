<script lang="ts">
    import "@common/styles/reset.css";
    import "@common/styles/main.css";
    import "@common/styles/font.css";

    import { inject } from '@vercel/analytics';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

    import { introduceDependency } from "@hooks/introduceDependency";

    import {
        TemplateRepositoryToken,
        createTemplateRepository,
    } from "@domain/template/template.repository";

    inject();
    injectSpeedInsights();

    introduceDependency(TemplateRepositoryToken, createTemplateRepository);
</script>

<svelte:head>
    <title>Templates</title>
    <meta property="twitter:card" content="summary">
    <meta property="twitter:title" content="Templates">
    <meta property="og:site_name" content="Templates">
    <meta property="og:title" content="Templates">
</svelte:head>

<slot />
