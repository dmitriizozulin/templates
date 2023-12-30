import { getContext } from "svelte";

export const inject = (token: Symbol): any => {
    return getContext(token) ?? null;
}