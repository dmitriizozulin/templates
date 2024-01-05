import { setContext } from "svelte";

export interface Token<DT> {
    _type?: DT;
    token: symbol;
}

type Initializator<D> = () => D;

export const introduceDependency = <DT>({ token, _type }: Token<DT>, initializator: Initializator<typeof _type>): void => {
    setContext(token, initializator());
}