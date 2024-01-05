import { getContext } from "svelte";

import type { Token } from "./introduceDependency";

export const inject = <DT>({ token, _type }: Token<DT>): NonNullable<typeof _type> => {
    const dependency = getContext<DT>(token);

    if (!dependency) {
        throw new Error(`Implementation for dependency ${String(token)} not provided`);
    }

    return dependency;
}