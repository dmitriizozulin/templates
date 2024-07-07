<script lang="ts">
    import "@common/styles/reset.css";
    import "@common/styles/main.css";
    import "@common/styles/font.css";

    import { inject } from '@vercel/analytics';

    import { introduceDependency } from "@hooks/introduceDependency";

    import {
        TemplateRepositoryToken,
        createTemplateRepository,
    } from "@domain/template/template.repository";

    inject();

    introduceDependency(TemplateRepositoryToken, createTemplateRepository);
</script>

<slot />
