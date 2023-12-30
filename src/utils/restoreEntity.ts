interface ICreatable<E> {
    restore: (params: any) => E
}

type ICreatableParams<C> = C extends {
    restore: (params: infer P) => any;
  } ? P : never;

export const restoreEntity = <
    E extends ICreatable<any>,
    P extends ICreatableParams<ICreatable<E>>,
>(ctor: E, params: P): ReturnType<E['restore']> => {
    return ctor.restore(params)
};