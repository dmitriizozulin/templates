<script lang="ts">
    import "@common/styles/reset.css";
    import "@common/styles/main.css";
    import "@common/styles/font.css";

    import { introduceDependency } from "@hooks/introduceDependency";

    import {
        TemplateRepositoryToken,
        createTemplateRepository,
    } from "@domain/template/template.repository";

    introduceDependency(TemplateRepositoryToken, createTemplateRepository);
</script>

<slot />
