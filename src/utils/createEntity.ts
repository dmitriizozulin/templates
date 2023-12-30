interface ICreatable<E> {
    new: (params: any) => E
}

type ICreatableParams<C> = C extends {
    new: (params: infer P) => any;
  } ? P : never;

export const createEntity = <
    E extends ICreatable<any>,
    P extends ICreatableParams<ICreatable<E>>,
>(ctor: E, params: P): ReturnType<E['new']> => {
    return ctor.new(params)
};