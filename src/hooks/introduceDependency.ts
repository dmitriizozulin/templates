import { setContext } from "svelte";

type Initializator = () => any;

export const introduceDependency = (token: Symbol, initializator: Initializator) => {
    setContext(token, initializator());
}