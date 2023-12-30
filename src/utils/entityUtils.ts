type EntityKeys = 'toDto';

type AttributesPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type Attributes<T> = Pick<T, AttributesPropertyNames<T>>;

export type ToConstructorParams<E extends object, KeysWithDefaults extends keyof E> = Attributes<
    Omit<
        Pick<E, Exclude<keyof E, KeysWithDefaults>> & Partial<Pick<E, KeysWithDefaults>>,
        EntityKeys
    >
>;

export type ToRestorationParams<E extends object> = {
    [K in keyof E]: E[K] extends Date
        ? string
        : E[K] extends Date | undefined
            ? string
            : E[K]
};